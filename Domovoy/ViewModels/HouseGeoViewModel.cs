using Domovoy.Helpers.Geo;

namespace Domovoy.ViewModels
{
    /// <summary>
    /// Координаты дома - для отображения маркера на карте
    /// </summary>
    public class HouseGeoViewModel
    {
        public int HouseId { get; set; }
        
        public double PosX { get; set; }
        public double PosY { get; set; }
        
    }
}