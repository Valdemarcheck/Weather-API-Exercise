const DATA_KINDS = {
  current: 0,
  day: 1,
};

function metersPerHourToMetersPerSecond(mph) {
  const mps = mph / 3600;
  return mps.toFixed(2);
}

export default class RequiredDataGetter {
  getRequiredWeatherData({ data, renderingParameters }) {
    const requiredData = {
      country: data.location.country,
      localTime: data.location.localtime,
      name: data.location.name,
      region: data.location.region,
      condition: data.current.condition.text,
      forecastDays: [],
    };

    const exactDataParameters = {
      renderingParameters,
      requiredDataObject: requiredData,
      allData: data,
      dataKind: DATA_KINDS.current,
    };

    this.#setSpeedRelatedParams(exactDataParameters);
    this.#setTemperatureRelatedParams(exactDataParameters);
    this.#setPressureRelatedParams(exactDataParameters);
    this.#setPrecipitationRelatedParams(exactDataParameters);
    this.#setForecastParams(exactDataParameters);
    return requiredData;
  }

  #setSpeedRelatedParams({
    allData,
    renderingParameters,
    requiredDataObject,
    dataKind,
  }) {
    switch (renderingParameters.speed) {
      case "kph":
        requiredDataObject.gust = allData.current.gust_kph;
        requiredDataObject.wind_speed = allData.current.wind_kph;
        break;
      case "mps":
        requiredDataObject.gust = metersPerHourToMetersPerSecond(
          allData.current.gust_mph
        );
        requiredDataObject.wind_speed = metersPerHourToMetersPerSecond(
          allData.current.wind_mph
        );
        break;
      case "mph":
        requiredDataObject.gust = allData.current.gust_mph;
        requiredDataObject.wind_speed = allData.current.wind_mph;
        break;
    }
  }

  #setTemperatureRelatedParams({
    allData,
    renderingParameters,
    requiredDataObject,
    dataKind,
  }) {
    if (dataKind === DATA_KINDS.current) {
      switch (renderingParameters.temperature) {
        case "temp_c":
          requiredDataObject.feelslike = allData.current.feelslike_c;
          requiredDataObject.temp = allData.current.temp_c;
          break;
        case "temp_f":
          requiredDataObject.feelslike = allData.current.feelslike_f;
          requiredDataObject.temp = allData.current.temp_f;
          break;
      }
    } else if (dataKind === DATA_KINDS.day) {
      switch (renderingParameters.temperature) {
        case "temp_c":
          requiredDataObject.maxtemp = allData.day.maxtemp_c;
          requiredDataObject.mintemp = allData.day.mintemp_c;
          break;
        case "temp_f":
          requiredDataObject.maxtemp = allData.day.maxtemp_f;
          requiredDataObject.mintemp = allData.day.mintemp_f;
          break;
      }
    }
  }

  #setPressureRelatedParams({
    allData,
    renderingParameters,
    requiredDataObject,
    dataKind,
  }) {
    requiredDataObject.pressure = allData.current[renderingParameters.pressure];
  }

  #setPrecipitationRelatedParams({
    allData,
    renderingParameters,
    requiredDataObject,
    dataKind,
  }) {
    requiredDataObject.precipitation =
      allData.current[renderingParameters.precipitation];
  }

  #setForecastParams({ allData, renderingParameters, requiredDataObject }) {
    for (let i = 0; i < allData.forecast.forecastday.length; i++) {
      const allDayData = allData.forecast.forecastday[i];
      const requiredDayData = {
        condition: allDayData.day.condition.text,
        imageURL: allDayData.day.condition.icon,
      };

      this.#setTemperatureRelatedParams({
        allData: allDayData,
        renderingParameters,
        requiredDataObject: requiredDayData,
        dataKind: DATA_KINDS.day,
      });

      requiredDataObject.forecastDays.push(requiredDayData);
    }
  }
}
