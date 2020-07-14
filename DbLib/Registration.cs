namespace DbLib {
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("educationPlanner.registrations")]
    public partial class Registration {
        [Key]
        public int primKey { get; set; }
        public int schooling_id { get; set; }
        
        public int person_id { get; set; }

       
    }
}
