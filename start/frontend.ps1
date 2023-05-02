param(
[string]$path
)

$host.ui.RawUI.WindowTitle = 'Frontend'
cd $path
yarn dev