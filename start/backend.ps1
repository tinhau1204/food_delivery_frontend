param(
[string]$path
)

$host.ui.RawUI.WindowTitle = 'Backend'
$pshost = Get-Host             
$pswindow = $pshost.UI.RawUI   

$newsize = $pswindow.windowsize 
$newsize.width = 100        
$newsize.height = 30
$pswindow.windowsize = $newsize 

cd $path
yarn dev