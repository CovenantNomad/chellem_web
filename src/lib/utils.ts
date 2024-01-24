import { Enums } from './../types/database.types';
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

export const getServiceName = (serviceType: Enums<'SERVICE_TYPE'>) => {
  switch (serviceType) {
    case "SUNDAY SERVICE":
      return '주일예배'

    case "WEDNESDAY SERVICE":
      return '수요예배'

    case "FRIDAY SERVICE":
      return '금요성령집회'

    case "DAYBREAK SERVICE":
      return '새벽예배'
  
    default:
      break;
  }
}

type Scripture = {
  book: string;
  chapter: number[];
  verse: number[];
};

export function parseScriptureInput(input: string): Scripture {
  const result: Scripture = {
    book: '',
    chapter: [],
    verse: []
  };

  // 책 이름 추출
  const bookMatch = input.match(/^(\D+)/);
  if (bookMatch) {
    result.book = bookMatch[1].trim();
  }

  // 장과 절 추출
  const chapterVersePart = input.slice(result.book.length).trim();
  const rangeParts = chapterVersePart.split(/~|-/).map(part => part.trim());

  if (rangeParts.length === 1) {
    // '~' 또는 '-'가 없는 경우
    const [chap, ver] = rangeParts[0].split(':').map(num => parseInt(num, 10));
    result.chapter.push(chap);
    if (!isNaN(ver)) {
      result.verse.push(ver);
    }
  } else {
    // '~' 또는 '-'가 있는 경우
    const firstPart = rangeParts[0].split(':').map(num => parseInt(num, 10));
    result.chapter.push(firstPart[0]);
    result.verse.push(firstPart[1]);

    if (rangeParts[1].includes(':')) {
      // 두 번째 부분에 ':'가 있는 경우
      const secondPart = rangeParts[1].split(':').map(num => parseInt(num, 10));
      result.chapter.push(secondPart[0]);
      result.verse.push(secondPart[1]);
    } else {
      // ':'가 없는 경우
      result.verse.push(parseInt(rangeParts[1], 10));
    }
  }

  return result;
}

export const convertBookType = (inputBook: string) => {
  switch (inputBook) {
    case '창' || '창세기':
      return "Gen"
    case '출' || '출애굽기':
      return "Ex"
    case '레' || '레위기':
      return "Lev"
    case '민' || '민수기':
      return "Num"
    case '신' || '신명기':
      return "Deut"
    case '수' || '여호수아':
      return "Josh"
    case '삿' || '사사기':
      return "Judg"
    case '룻' || '룻기':
      return "Ruth"
    case '삼상' || '사무엘상':
      return "1 Sam"
    case '삼하' || '사무엘하':
      return "2 Sam"
    case '왕상' || '열왕기상':
      return "1 Kings"
    case '왕하' || '열왕기하':
      return "2 Kings"
    case '대상' || '역대상':
      return "1 Chron"
    case '대하' || '역대하':
      return "2 Chron"
    case '스' || '에스라':
      return "Ezra"
    case '느' || '느헤미야':
      return "Neh"
    case '에' || '에스더':
      return "Esth"
    case '욥' || '욥기':
      return "Job"
    case '시' || '시편':
      return "Ps"
    case '잠' || '잠언':
      return "Prov"
    case '전' || '전도서':
      return "Eccl"
    case '아' || '아가':
      return "Song"
    case '사' || '이사야':
      return "Isa"
    case '렘' || '예레미야':
      return "Jer"
    case '애' || '예레미야애가':
      return "Lam"
    case '겔' || '에스겔':
      return "Ezek"
    case '단' || '다니엘':
      return "Dan"
    case '호' || '호세아':
      return "Hos"
    case '욜' || '요엘':
      return "Joel"
    case '암' || '아모스':
      return "Amos"
    case '옵' || '오바다':
      return "Obad"
    case '욘' || '요나':
      return "Jonah"
    case '미' || '미가':
      return "Mic"
    case '나' || '나훔':
      return "Nah"
    case '합' || '하박국':
      return "Hab"
    case '습' || '스바냐':
      return "Zeph"
    case '학' || '학개':
      return "Hag"
    case '슥' || '스가랴':
      return "Zech"
    case '말' || '말라기':
      return "Mal"

    //신약
    case '마' || '마태복음':
      return "Matt"
    case '막' || '마가복음':
      return "Mark"
    case '눅' || '누가복음':
      return "Luke"
    case '요' || '요한복음':
      return "John"
    case '행' || '사도행전':
      return "Acts"
    case '롬' || '로마서':
      return "Rom"
    case '고전' || '고린도전서':
      return "1 Cor"
    case '고후' || '고린도후서':
      return "2 Cor"
    case '갈' || '갈라디아서':
      return "Gal"
    case '엡' || '에베소서':
      return "Eph"
    case '빌' || '빌립보서':
      return "Phil"
    case '골' || '골로새서':
      return "Col"
    case '살전' || '데살로니가전서':
      return "1 Thess"
    case '살후' || '데살로니가후서':
      return "2 Thess"
    case '딤전' || '디모데전서':
      return "1 Tim"
    case '딤후' || '디모데후서':
      return "2 Tim"
    case '딛' || '디도서':
      return "Titus"
    case '몬' || '빌레몬서':
      return "Philem"
    case '히' || '히브리서':
      return "Heb"
    case '약' || '야고보서':
      return "James"
    case '벧전' || '베드로전서':
      return "1 Pet"
    case '벧후' || '베드로후서':
      return "2 Pet"
    case '요1' || '요한1서':
      return "1 John"
    case '요2' || '요한2서':
      return "2 John"
    case '요3' || '요한3서':
      return "3 John"
    case '유' || '유다서':
      return "Jude"
    case '계' || '요한계시록':
      return "Rev"
  
    default:
      return null
  }
}