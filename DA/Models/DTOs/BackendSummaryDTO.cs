using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DA.Models.DTOs {
    public class BackendSummaryDTO {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool Display { get; set; }
    }
}
