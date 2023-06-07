# Set root directory
$root = $PSScriptRoot

# Get frontend directory
cd ..
$frontpath = $pwd

# Get backend directory
cd ..
cd backend

$backpath = $pwd

# Set location to root folder to run scripts
cd $root

# Run frontend indirectly
# start powershell "& {.\frontend.ps1 $frontpath; Read-Host}"

# Run backend indirectly
cd $root
start powershell "& {.\backend.ps1 $backpath; Read-Host}"

# Run frontend directly
cd $frontpath
yarn dev
