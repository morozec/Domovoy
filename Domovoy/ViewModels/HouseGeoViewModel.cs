using Domovoy.Helpers.Geo;

namespace Domovoy.ViewModels
{
    public class HouseGeoViewModel
    {
        public int HouseId { get; set; }
        
        public double PosX { get; set; }
        public double PosY { get; set; }

        public double LowerCornerX { get; set; }
        public double LowerCornerY { get; set; }

        public double UpperCornerX { get; set; }
        public double UpperCornerY { get; set; }
    }
}