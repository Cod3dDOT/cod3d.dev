/*
 * Copyright (c) Nicolas Gryman <ngryman@gmail.com>
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export type Options = {
	wordBound?: WordBoundFunction;
	wordsPerMinute?: number;
};

export type ReadingTimeStats = {
	time: number;
	minutes: number;
};

export type WordCountStats = {
	total: number;
};

export type ReadingTimeResult = ReadingTimeStats & {
	words: WordCountStats;
};

type WordBoundFunction = (char: string) => boolean;

function codeIsInRanges(number: number, arrayOfRanges: number[][]) {
	return arrayOfRanges.some(
		([lowerBound, upperBound]) => lowerBound <= number && number <= upperBound
	);
}

const isCJK: WordBoundFunction = (c) => {
	const charCode = c.charCodeAt(0);
	// Help wanted!
	// This should be good for most cases, but if you find it unsatisfactory
	// (e.g. some other language where each character should be standalone words),
	// contributions welcome!
	return codeIsInRanges(charCode, [
		// Hiragana (Katakana not included on purpose,
		// context: https://github.com/ngryman/reading-time/pull/35#issuecomment-853364526)
		// If you think Katakana should be included and have solid reasons, improvement is welcomed
		[0x3040, 0x309f],
		// CJK Unified ideographs
		[0x4e00, 0x9fff],
		// Hangul
		[0xac00, 0xd7a3],
		// CJK extensions
		[0x20000, 0x2ebe0]
	]);
};

const isAnsiWordBound: WordBoundFunction = (c) => {
	return " \n\r\t".includes(c);
};

const isPunctuation: WordBoundFunction = (c) => {
	const charCode = c.charCodeAt(0);
	return codeIsInRanges(charCode, [
		[0x21, 0x2f],
		[0x3a, 0x40],
		[0x5b, 0x60],
		[0x7b, 0x7e],
		// CJK Symbols and Punctuation
		[0x3000, 0x303f],
		// Full-width ASCII punctuation variants
		[0xff00, 0xffef]
	]);
};

export function countWords(
	text: string,
	options: Options = {}
): WordCountStats {
	let words = 0;
	let start = 0;
	let end = text.length - 1;
	const { wordBound: isWordBound = isAnsiWordBound } = options;

	// fetch bounds
	while (isWordBound(text[start])) start++;
	while (isWordBound(text[end])) end--;

	// Add a trailing word bound to make handling edges more convenient
	const normalizedText = `${text}\n`;

	// calculate the number of words
	for (let i = start; i <= end; i++) {
		// A CJK character is a always word;
		// A non-word bound followed by a word bound / CJK is the end of a word.
		if (
			isCJK(normalizedText[i]) ||
			(!isWordBound(normalizedText[i]) &&
				(isWordBound(normalizedText[i + 1]) || isCJK(normalizedText[i + 1])))
		) {
			words++;
		}
		// In case of CJK followed by punctuations, those characters have to be eaten as well
		if (isCJK(normalizedText[i])) {
			while (
				i <= end &&
				(isPunctuation(normalizedText[i + 1]) ||
					isWordBound(normalizedText[i + 1]))
			) {
				i++;
			}
		}
	}
	return { total: words };
}

export function readingTimeWithCount(
	words: WordCountStats,
	options: Options = {}
): ReadingTimeStats {
	const { wordsPerMinute = 150 } = options;
	// reading time stats
	const minutes = words.total / wordsPerMinute;
	// Math.round used to resolve floating point funkiness
	//   http://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html
	const time = Math.round(minutes * 60 * 1000);
	const displayed = Math.ceil(Number.parseFloat(minutes.toFixed(2)));

	return {
		minutes: displayed,
		time
	};
}

export default function readingTime(
	text: string,
	options: Options = {}
): ReadingTimeResult {
	const words = countWords(text, options);
	return {
		...readingTimeWithCount(words, options),
		words
	};
}
