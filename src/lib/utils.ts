import { Enums, Tables } from './../types/database.types';
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

    case "NEW MOON SERVICE":
      return '월삭예배'

    case "SPECIAL DAYBREAK SERVICE":
      return '특별새벽기도회'
  
    case "SPECIAL SERVICE":
      return '특별집회'

    default:
      break;
  }
}

export const getNoteName = (noteType: string) => {
  switch (noteType) {
    case 'QT':
      return 'QT노트'

    case 'SERMON':
      return '설교노트'

    case 'DIARY':
      return '영성일기'

    case 'THANKS':
      return '감사노트'

    case 'CONTEMPLATION':
      return '묵상노트'
  
    default:
      break;
  }
}

type Scripture = {
  book: string;
  chapter: string[];
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
    result.chapter.push(chap.toString());
    if (!isNaN(ver)) {
      result.verse.push(ver);
    }
  } else {
    // '~' 또는 '-'가 있는 경우
    const firstPart = rangeParts[0].split(':').map(num => parseInt(num, 10));
    result.chapter.push(firstPart[0].toString());
    result.verse.push(firstPart[1]);

    if (rangeParts[1].includes(':')) {
      // 두 번째 부분에 ':'가 있는 경우
      const secondPart = rangeParts[1].split(':').map(num => parseInt(num, 10));
      result.chapter.push(secondPart[0].toString());
      result.verse.push(secondPart[1]);
    } else {
      // ':'가 없는 경우
      result.verse.push(parseInt(rangeParts[1], 10));
    }
  }

  return result;
}

export function filterItemsByDate(items: Tables<'notes'>[]) {
  const today = new Date();
  const tommorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const sevenDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  const thirtyDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);

  const lastSevenDaysItems = items.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= sevenDaysAgo && itemDate < tommorrow;
  });

  const lastThirtyDaysItems = items.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= thirtyDaysAgo && itemDate < sevenDaysAgo;
  });

  const olderThanThirtyDaysItems = items.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate < thirtyDaysAgo;
  });

  return {
    lastSevenDaysItems,
    lastThirtyDaysItems,
    olderThanThirtyDaysItems
  };
}

export const convertBookType = (inputBook: string) => {
  switch (inputBook) {
    case '창': 
    case '창세기':
      return "Gen"
    case '출': 
    case '출애굽기':
      return "Ex"
    case '레': 
    case '레위기':
      return "Lev"
    case '민': 
    case '민수기':
      return "Num"
    case '신': 
    case '신명기':
      return "Deut"
    case '수': 
    case '여호수아':
      return "Josh"
    case '삿': 
    case '사사기':
      return "Judg"
    case '룻': 
    case '룻기':
      return "Ruth"
    case '삼상': 
    case '사무엘상':
      return "1 Sam"
    case '삼하': 
    case '사무엘하':
      return "2 Sam"
    case '왕상': 
    case '열왕기상':
      return "1 Kings"
    case '왕하': 
    case '열왕기하':
      return "2 Kings"
    case '대상': 
    case '역대상':
      return "1 Chron"
    case '대하': 
    case '역대하':
      return "2 Chron"
    case '스': 
    case '에스라':
      return "Ezra"
    case '느': 
    case '느헤미야':
      return "Neh"
    case '에': 
    case '에스더':
      return "Esth"
    case '욥': 
    case '욥기':
      return "Job"
    case '시': 
    case '시편':
      return "Ps"
    case '잠': 
    case '잠언':
      return "Prov"
    case '전': 
    case '전도서':
      return "Eccl"
    case '아': 
    case '아가':
      return "Song"
    case '사': 
    case '이사야':
      return "Isa"
    case '렘': 
    case '예레미야':
      return "Jer"
    case '애': 
    case '예레미야애가':
      return "Lam"
    case '겔': 
    case '에스겔':
      return "Ezek"
    case '단': 
    case '다니엘':
      return "Dan"
    case '호': 
    case '호세아':
      return "Hos"
    case '욜': 
    case '요엘':
      return "Joel"
    case '암': 
    case '아모스':
      return "Amos"
    case '옵': 
    case '오바다':
      return "Obad"
    case '욘': 
    case '요나':
      return "Jonah"
    case '미': 
    case '미가':
      return "Mic"
    case '나': 
    case '나훔':
      return "Nah"
    case '합': 
    case '하박국':
      return "Hab"
    case '습': 
    case '스바냐':
      return "Zeph"
    case '학': 
    case '학개':
      return "Hag"
    case '슥': 
    case '스가랴':
      return "Zech"
    case '말': 
    case '말라기':
      return "Mal"

    //신약
    case '마': 
    case '마태복음':
      return "Matt"
    case '막': 
    case '마가복음':
      return "Mark"
    case '눅': 
    case '누가복음':
      return "Luke"
    case '요': 
    case '요한복음':
      return "John"
    case '행': 
    case '사도행전':
      return "Acts"
    case '롬': 
    case '로마서':
      return "Rom"
    case '고전': 
    case '고린도전서':
      return "1 Cor"
    case '고후': 
    case '고린도후서':
      return "2 Cor"
    case '갈': 
    case '갈라디아서':
      return "Gal"
    case '엡': 
    case '에베소서':
      return "Eph"
    case '빌': 
    case '빌립보서':
      return "Phil"
    case '골': 
    case '골로새서':
      return "Col"
    case '살전': 
    case '데살로니가전서':
      return "1 Thess"
    case '살후': 
    case '데살로니가후서':
      return "2 Thess"
    case '딤전': 
    case '디모데전서':
      return "1 Tim"
    case '딤후': 
    case '디모데후서':
      return "2 Tim"
    case '딛': 
    case '디도서':
      return "Titus"
    case '몬': 
    case '빌레몬서':
      return "Philem"
    case '히': 
    case '히브리서':
      return "Heb"
    case '약': 
    case '야고보서':
      return "James"
    case '벧전': 
    case '베드로전서':
      return "1 Pet"
    case '벧후': 
    case '베드로후서':
      return "2 Pet"
    case '요1': 
    case '요한1서':
      return "1 John"
    case '요2': 
    case '요한2서':
      return "2 John"
    case '요3': 
    case '요한3서':
      return "3 John"
    case '유': 
    case '유다서':
      return "Jude"
    case '계': 
    case '요한계시록':
      return "Rev"
  
    default:
      return null
  }
}