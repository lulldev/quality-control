#include <iostream>

using namespace std;

int main(int argc, char* argv[]) 
{
  if (argc != 4) 
  {
    cout << "Invalid arguments count." << endl;
    return -1;
  }
  
  unsigned sideA, sideB, sideC;
  string strSideA = argv[1];
  string strSideB = argv[2];
  string strSideC = argv[3];

  if (isdigit(strSideA[0]) && isdigit(strSideB[0]) && isdigit(strSideC[0]))
  {
    try
    {
      sideA = stoi(strSideA);
      sideB = stoi(strSideB);
      sideC = stoi(strSideC);
      cout << "All right" << endl;
    }
    catch(...)
    {
      cout << "Invalid arguments types" << endl;
      return -1;
    }
  }
  else 
  {
    cout << "Invalid arguments types" << endl;
    return -1;
  }

  return 0;
}