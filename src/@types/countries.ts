export interface Country {
	id: string;
	capital: string[];
	name: {
		common: string;
		nativeName: string;
		official: string;
	};
	flags: {
		png: string;
		svg: string;
		alt: string;
	};
	region: string;
	subregion: string;
	population: number;
	area: number;
	languages: Record<string, string>;
	currencies: Record<
		string,
		{
			name: string;
			symbol: string;
		}
	>;
}
