import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const generateCorrectAnswer = (verse: string[][]) => {
  const splitText: { [key: number]: string } = verse
  .flat()
  .join('')
  .split('')
  .reduce((acc: { [key: number]: string }, char: string, index: number) => {
    acc[index + 1] = char;
    return acc;
  }, {});

  return splitText
}

export function compareArrays(array1: number[], array2: number[]): boolean {
  // 두 배열의 길이가 다르다면 동일한 함수가 없다고 판단합니다.
  if (array1.length !== array2.length) {
    return false;
  }

  // 각 배열의 요소를 순회하면서 같은 위치의 값이 같은지 확인합니다.
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      // 동일한 위치의 값이 다르다면 동일한 함수가 없다고 판단합니다.
      return false;
    }
  }

  // 모든 위치에서 값이 동일하다면 동일한 함수가 있는 것으로 판단합니다.
  return true;
}

// export function findDifferentIndexes(array1: number[], array2: number[]): number[] {
//   const differentIndexes: number[] = [];

//   // 두 배열의 길이 중 작은 길이를 기준으로 반복문을 돕니다.
//   const minLength = Math.min(array1.length, array2.length);
//   for (let i = 0; i < minLength; i++) {
//     if (array1[i] !== array2[i]) {
//       // 값이 다르면 해당 인덱스를 differentIndexes 배열에 추가합니다.
//       differentIndexes.push(i);
//     }
//   }

//   // 두 배열 중 어느 배열이 더 긴지 확인하여 나머지 요소들도 추가합니다.
//   const maxLength = Math.max(array1.length, array2.length);
//   for (let i = minLength; i < maxLength; i++) {
//     differentIndexes.push(i);
//   }

//   return differentIndexes;
// }

export function findDifferentIndexes(array1: number[], array2: number[]) {
  const differentIndexes = [];

  // 두 배열의 길이를 확인하여 길이가 다른 경우 메시지를 반환합니다.
  if (array1.length !== array2.length) {
    return
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      // 값이 다르면 해당 인덱스를 differentIndexes 배열에 추가합니다.
      differentIndexes.push(i);
    }
  }

  if (differentIndexes.length === 0) {
    return
  }

  // differentIndexes 배열을 이용하여 값이 다른 인덱스를 문자열로 반환합니다.
  const result = differentIndexes
    .map((index) => `${index+1}줄`)
    .join(", ");

  return `${result}의 글자 수가 맞지 않습니다.`;
}