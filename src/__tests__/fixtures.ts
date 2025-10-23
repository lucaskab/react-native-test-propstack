import type { Country } from "@/@types/countries";

/**
 * Mock European countries data for testing
 * These fixtures represent a typical API response from the countries endpoint
 */

export const mockGermany: Country = {
	id: "1",
	region: "Europe",
	subregion: "Western Europe",
	population: 83783942,
	area: 357114,
	name: {
		common: "Germany",
		official: "Federal Republic of Germany",
		nativeName: "Deutschland",
	},
	capital: ["Berlin"],
	flags: {
		png: "https://flagcdn.com/w320/de.png",
		svg: "https://flagcdn.com/de.svg",
		alt: "The flag of Germany is composed of three equal horizontal bands of black, red and gold.",
	},
	languages: {
		deu: "German",
	},
	currencies: {
		EUR: {
			name: "Euro",
			symbol: "€",
		},
	},
};

export const mockFrance: Country = {
	id: "2",
	region: "Europe",
	subregion: "Western Europe",
	population: 67391582,
	area: 551695,
	name: {
		common: "France",
		official: "French Republic",
		nativeName: "France",
	},
	capital: ["Paris"],
	flags: {
		png: "https://flagcdn.com/w320/fr.png",
		svg: "https://flagcdn.com/fr.svg",
		alt: "The flag of France is composed of three equal vertical bands of blue, white and red.",
	},
	languages: {
		fra: "French",
	},
	currencies: {
		EUR: {
			name: "Euro",
			symbol: "€",
		},
	},
};

export const mockItaly: Country = {
	id: "3",
	region: "Europe",
	subregion: "Southern Europe",
	population: 59554023,
	area: 301336,
	name: {
		common: "Italy",
		official: "Italian Republic",
		nativeName: "Italia",
	},
	capital: ["Rome"],
	flags: {
		png: "https://flagcdn.com/w320/it.png",
		svg: "https://flagcdn.com/it.svg",
		alt: "The flag of Italy is composed of three equal vertical bands of green, white and red.",
	},
	languages: {
		ita: "Italian",
	},
	currencies: {
		EUR: {
			name: "Euro",
			symbol: "€",
		},
	},
};

/**
 * Sorted array of European countries (alphabetically by common name)
 */
export const mockEuropeanCountries: Country[] = [
	mockFrance,
	mockGermany,
	mockItaly,
];

/**
 * Unsorted version of European countries for testing sorting functionality
 */
export const mockUnsortedCountries: Country[] = [
	mockGermany,
	mockItaly,
	mockFrance,
];

/**
 * Mock country without capital for testing edge cases
 */
export const mockCountryNoCapital: Country = {
	...mockGermany,
	capital: [],
};
