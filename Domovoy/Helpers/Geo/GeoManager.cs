using System;
using System.Linq;
using System.Net;
using Newtonsoft.Json;

namespace Domovoy.Helpers.Geo
{
    public static class GeoManager
    {
        private const string API_KEY = "0f21bfb6-f5c3-4931-a9ee-244137ca2c46";

        private static double[] GetCoordinates(string coordString)
        {
            return coordString.Split(" ").Select(Convert.ToDouble).ToArray();
        }

        public static GeoData GetAddressGeoData(string address)
        {
            using (WebClient wc = new WebClient())
            {
                var url = $"https://geocode-maps.yandex.ru/1.x/?format=json&apikey={API_KEY}&geocode={address}";
                var json = wc.DownloadString(url);
                return GetJsonGeoData(json);
            }
        }

        public static GeoData GetJsonGeoData(string json)
        {
            dynamic obj = JsonConvert.DeserializeObject(json);
            if (obj == null)
                return null;

            var featureMember = obj.response.GeoObjectCollection.featureMember[0];
            if (featureMember == null)
                return null;

            var geoObject = featureMember.GeoObject;
            var pos = geoObject.Point.pos;
            var lowerCorner = geoObject.boundedBy.Envelope.lowerCorner;
            var upperCorner = geoObject.boundedBy.Envelope.upperCorner;

            return new GeoData()
            {
                Pos = GetCoordinates(pos.Value),
                LowerCorner = GetCoordinates(lowerCorner.Value),
                UpperCorner = GetCoordinates(upperCorner.Value),
            };
        }


    }
}