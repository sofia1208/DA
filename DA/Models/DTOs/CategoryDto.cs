using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DA.Models.DTOs {
    public class CategoryDto {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Kurzbeschreibung { get; set; }
        public string ContentLink { get; set; }
    }
}
