import {ChatCompletionAssistantMessageParam} from "openai/src/resources/chat/completions";
import {LatLng, WeatherService} from "./lib/weather";

enum CallableFunctions {
    Geocode = 'geocode',
    GetWeather = 'getWeather',
}

interface GeocodeArgs {
    cityNameOrZipCode: string;
}

const getWeather = async (data: LatLng): Promise<string> => {
    const weather = new WeatherService();
    const currentWeather = await weather.getCurrentWeather(data);
    return JSON.stringify(currentWeather);
}

const geocode = async (data: GeocodeArgs): Promise<string> => {
    const weather = new WeatherService();
    const geo = await weather.geocode(data.cityNameOrZipCode);
    return JSON.stringify(geo);
}

export const handleCalledFunction = async (call: ChatCompletionAssistantMessageParam.FunctionCall): Promise<string> => {
    try {

        switch (call.name as CallableFunctions) {
            case CallableFunctions.Geocode:
                return await geocode(JSON.parse(call.arguments));

            case CallableFunctions.GetWeather:
                return await getWeather(JSON.parse(call.arguments));

            default:
                throw new Error('Unknown function name.');
        }

    } catch(e) {
        return (e as Error).message;
    }
}