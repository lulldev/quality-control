buildPath="build"
outputFileName="triangle-detector.o"

echo "Compile program..."
g++ main.cpp -o $buildPath/$outputFileName
cd $buildPath
echo "Testing start:"
"./$outputFileName"
