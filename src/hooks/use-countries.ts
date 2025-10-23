import { useQuery } from "@tanstack/react-query";
import type { Country } from "@/@types/countries";
import { api } from "@/services/api";

export const getCountries = async (): Promise<Country[]> => {
	const { data } = await api.get(
		`/region/europe?fields=name,capital,flags,population,currencies,languages,subregion,area`,
	);

	return data.sort((a: Country, b: Country) =>
		a.name.common.localeCompare(b.name.common),
	);
};

export const useCountries = () => {
	return useQuery({
		queryKey: ["countries"],
		queryFn: () => getCountries(),
	});
};
