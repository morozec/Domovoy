﻿namespace Domovoy.ViewModels
{
    /// <summary>
    /// Вся информация о доме - данные и координаты
    /// </summary>
    public class HouseViewModel
    {
        public int HouseId { get; set; }

        /// <summary>
        /// Ссылка на Управляющую компанию
        /// </summary>
        public int? UkId { get; set; }

        /// <summary>
        /// Район
        /// </summary>
        public string District { get; set; }
        /// <summary>
        /// Адрес
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// Дата строительства
        /// </summary>
        public int? BuildYear { get; set; }
        /// <summary>
        /// Кол-во этажей
        /// </summary>
        public int MaxFloor { get; set; }
        /// <summary>
        /// Тип крыши
        /// </summary>
        public string RoofType { get; set; }
        /// <summary>
        /// Материал крыши
        /// </summary>
        public string RoofMaterial { get; set; }
        /// <summary>
        /// Материал стен
        /// </summary>
        public string WallMaterial { get; set; }
        /// <summary>
        /// Общая площадь?
        /// </summary>
        public double? AreaMKD { get; set; }
        public double? AreaLivNotLivMKD { get; set; }
        /// <summary>
        /// Жилая площадь?
        /// </summary>
        public double? AreaLiving { get; set; }
        /// <summary>
        /// Жилай площадь в собственности?
        /// </summary>
        public double? AreaLivingOwned { get; set; }
        /// <summary>
        /// Количество квартир
        /// </summary>
        public int? NumberApartments { get; set; }
        /// <summary>
        /// Количество подъездов
        /// </summary>
        public int? NumberEntrances { get; set; }
        /// <summary>
        /// Износ
        /// </summary>
        public double? PhysicalWear { get; set; }

        /// <summary>
        /// Рейтинг дома
        /// </summary>
        public double Rank { get; set; }

        /// <summary>
        /// Кол-во аварий за прошедший год
        /// </summary>
        public int CountAccident { get; set; }

        /// <summary>
        /// Стоимость обслуживания
        /// </summary>
        public double MaintenanceCost { get; set; }
        
        public OrganizationViewModel UK { get; set; }

        public double PosX { get; set; }
        public double PosY { get; set; }

        public double LowerCornerX { get; set; }
        public double LowerCornerY { get; set; }

        public double UpperCornerX { get; set; }
        public double UpperCornerY { get; set; }
    }
}