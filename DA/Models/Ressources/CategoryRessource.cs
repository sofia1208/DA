using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DA.Models.Ressources {
    public class CategoryRessource {
        public int Id { get; set; }
        public int Name { get; set; }
        public string ShortDescription { get; set; }
        public int ContentLink { get; set; }
    }
}
