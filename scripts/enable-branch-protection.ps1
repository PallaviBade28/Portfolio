<#
  Enable branch protection for the `main` branch in this repository.

  USAGE (PowerShell):
    $env:GITHUB_TOKEN = "ghp_..."  # token must have repo:admin (or admin) scope
    .\scripts\enable-branch-protection.ps1 -Owner "PallaviBade28" -Repo "Portfolio" -Branch "main"

  The script calls the GitHub REST API and sets protection to require status checks and require branches to be up to date.
  Review the JSON body below to adjust checks you want enforced.
#>

param(
  [string]$Owner = "PallaviBade28",
  [string]$Repo = "Portfolio",
  [string]$Branch = "main"
)

if (-not $env:GITHUB_TOKEN) {
  Write-Error "GITHUB_TOKEN environment variable is not set. Provide a token with repo admin scope and re-run."
  exit 1
}

$apiUrl = "https://api.github.com/repos/$Owner/$Repo/branches/$Branch/protection"

# Protection payload: require status checks (the lint workflow) and require branches up to date
$body = @{
  required_status_checks = @{
    strict = $true;
    contexts = @("Lint")
  };
  enforce_admins = $true;
  required_pull_request_reviews = @{
    dismissal_restrictions = @{};
    dismiss_stale_reviews = $false;
    require_code_owner_reviews = $false;
    required_approving_review_count = 1
  };
  restrictions = $null;
  required_linear_history = $false;
  allow_force_pushes = $false;
  allow_deletions = $false;
} | ConvertTo-Json -Depth 8

Write-Output "Applying branch protection to $Owner/$Repo branch $Branch..."

$headers = @{ Authorization = "token $($env:GITHUB_TOKEN)"; Accept = 'application/vnd.github+json'; 'User-Agent' = 'enable-branch-protection-script' }

$resp = Invoke-RestMethod -Uri $apiUrl -Method PUT -Headers $headers -Body $body -ContentType 'application/json' -ErrorAction Stop

Write-Output "Branch protection applied. Response:";
$resp | ConvertTo-Json -Depth 5
