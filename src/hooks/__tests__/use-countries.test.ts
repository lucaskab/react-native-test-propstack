import {
	mockEuropeanCountries,
	mockFrance,
	mockGermany,
	mockItaly,
	mockUnsortedCountries,
} from "@/__tests__/fixtures";
import { api } from "@/services/api";
import { getCountries } from "../use-countries";

const mockApi = api as jest.Mocked<typeof api>;

jest.unmock("@tanstack/react-query");

describe("use-countries", () => {
	describe("getCountries", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it("fetches countries from the Europe region with correct fields", async () => {
			mockApi.get.mockResolvedValue({ data: mockEuropeanCountries });

			await getCountries();

			expect(mockApi.get).toHaveBeenCalledWith(
				"/region/europe?fields=name,capital,flags,population,currencies,languages,subregion,area",
			);
			expect(mockApi.get).toHaveBeenCalledTimes(1);
		});

		it("returns sorted countries alphabetically by common name", async () => {
			mockApi.get.mockResolvedValue({ data: mockUnsortedCountries });

			const result = await getCountries();

			expect(result).toHaveLength(3);
			expect(result[0].name.common).toBe("France");
			expect(result[1].name.common).toBe("Germany");
			expect(result[2].name.common).toBe("Italy");
		});

		it("handles empty response", async () => {
			mockApi.get.mockResolvedValue({ data: [] });

			const result = await getCountries();

			expect(result).toEqual([]);
		});

		it("handles API errors", async () => {
			const error = new Error("Network error");
			mockApi.get.mockRejectedValue(error);

			await expect(getCountries()).rejects.toThrow("Network error");
		});

		it("handles API timeout", async () => {
			const timeoutError = new Error("Request timeout");
			mockApi.get.mockRejectedValue(timeoutError);

			await expect(getCountries()).rejects.toThrow("Request timeout");
		});

		it("sorts countries case-insensitively", async () => {
			const countriesWithMixedCase = [
				{
					...mockFrance,
					name: { ...mockFrance.name, common: "france" },
				},
				{
					...mockGermany,
					name: { ...mockGermany.name, common: "GERMANY" },
				},
				{
					...mockItaly,
					name: { ...mockItaly.name, common: "Italy" },
				},
			];

			mockApi.get.mockResolvedValue({ data: countriesWithMixedCase });

			const result = await getCountries();

			expect(result[0].name.common).toBe("france");
			expect(result[1].name.common).toBe("GERMANY");
			expect(result[2].name.common).toBe("Italy");
		});

		it("handles special characters in country names", async () => {
			const countriesWithSpecialChars = [
				{
					...mockFrance,
					name: { ...mockFrance.name, common: "Åland Islands" },
				},
				{
					...mockGermany,
					name: { ...mockGermany.name, common: "Germany" },
				},
			];

			mockApi.get.mockResolvedValue({ data: countriesWithSpecialChars });

			const result = await getCountries();

			expect(result).toHaveLength(2);
			expect(result.every((country) => country.name.common)).toBe(true);
		});
	});
});
