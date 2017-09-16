buildPath="build"
outputFileName="triangle-detector.o"

clear
echo "Compile program..."
g++ main.cpp -o $buildPath/$outputFileName
cd ${buildPath}
echo "Testing start ($buildPath/$outputFileName)"
./$outputFileName 1 11 1d
