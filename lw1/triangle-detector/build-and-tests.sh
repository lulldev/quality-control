buildPath="build"
outputFileName="triangle-detector.o"
errCode=255

clear
echo "Compile program..."
g++ main.cpp -o $buildPath/$outputFileName
cd ${buildPath}

echo "Testing start ($buildPath/$outputFileName)\n"

echo "[*] Without arguments"
./$outputFileName
if [ $? != ${errCode} ]; then
    echo "[+] test failed!\n"
    exit
fi

echo "[*] With 1 valid argument"
./$outputFileName 2
if [ $? != ${errCode} ]; then
    echo "[+] test failed!!\n"
    exit
fi

echo "[*] With 2 valid argument"
./$outputFileName 2 3
if [ $? != ${errCode} ]; then
    echo "[+] test failed!!\n"
    exit
fi

echo "[*] With 3 valid argument"
./$outputFileName 2 3 3
if [ $? != 2 ]; then
    echo "[+] test failed!!\n"
    exit
fi

echo "[*] With 4 valid argument"
./$outputFileName 2 3 3
if [ $? = ${errCode} ]; then
    echo "[+] test failed!!\n"
    exit
fi

echo "[*] With 1 invalid argument"
./$outputFileName sd
if [ $? != ${errCode} ]; then
    echo "[+] test failed!!\n"
    exit
fi

echo "[*] With 2 invalid argument"
./$outputFileName sd sd
if [ $? != ${errCode} ]; then
    echo "[+] test failed!!\n"
    exit
fi

echo "[*] With 3 invalid argument"
./$outputFileName sd sd ds
if [ $? != ${errCode} ]; then
    echo "[+] test failed!!\n"
    exit
fi

echo "[*] With 4 invalid argument"
./$outputFileName sd sd ds a
if [ $? != ${errCode} ]; then
    echo "[+] test failed!!\n"
    exit
fi

echo "[*] With big numbers"
./$outputFileName 10000000 100000000000000000000 100000000000000000000000000000000
if [ $? != ${errCode} ]; then
    echo "[+] test failed!!\n"
    exit
fi

echo "[*] Invalid triangle ./$outputFileName 0 2 3"
./$outputFileName 0 2 3
if [ $? != 0 ]; then
    echo "[+] test failed!!\n"
    exit
fi

echo "[*] Equilateral trianlge ./$outputFileName 5 5 5"
./$outputFileName 5 5 5
if [ $? != 3 ]; then
    echo "[+] test failed!!\n"
    exit
fi

echo "[*] Isosceles trianlge ./$outputFileName 2 2 3"
./$outputFileName 2 2 3
if [ $? != 2 ]; then
    echo "[+] test failed!!\n"
    exit
fi

echo "[*] Conventional (simple) trianlge ./$outputFileName 3 2 3"
./$outputFileName 3 2 3
if [ $? != 1 ]; then
    echo "[+] test failed!!\n"
    exit
fi
echo "\n[DONE] All tests passed!"
