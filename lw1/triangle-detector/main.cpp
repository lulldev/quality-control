#include <iostream>

using namespace std;

enum TRIANGLE_TYPES {
  INVALID,
  CONVENTIONAL, 
  ISOSCELES, 
  EQUILATERAL
};

TRIANGLE_TYPES GetTriangleType(unsigned sideA, unsigned sideB, unsigned sideC) 
{
  if ((sideA + sideB > sideC) & (sideA + sideC > sideB) & (sideB + sideC > sideA)) 
  {
    if ((sideA == sideB) && (sideB == sideC))
    {
      return EQUILATERAL;
    }
    else
    {
      if ((sideA == sideB) || (sideB == sideC))
      {
        return ISOSCELES;
      }
      else 
      {
        return CONVENTIONAL;
      }
    }
  }
  return INVALID;
}

int main(int argc, char* argv[]) 
{
  if (argc != 4) 
  {
    cout << "Invalid arguments count." << endl;
    return -1;
  }
  
  float sideA, sideB, sideC;
  string strSideA = argv[1];
  string strSideB = argv[2];
  string strSideC = argv[3];

  if (isdigit(strSideA[0]) && isdigit(strSideB[0]) && isdigit(strSideC[0]))
  {
    try
    {
      sideA = stof(strSideA);
      sideB = stof(strSideB);
      sideC = stof(strSideC);
      string resultType("");
      TRIANGLE_TYPES triangleType = GetTriangleType(sideA, sideB, sideC);
      switch (triangleType) 
      {
        case INVALID:
          resultType = "invalid";
          break;
        case CONVENTIONAL:
          resultType = "conventional";
          break;
        case ISOSCELES:
          resultType = "isosceles";
          break;
        case EQUILATERAL:
          resultType = "equilateral";
          break;   
      }
      cout << resultType << endl;
      return triangleType;
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