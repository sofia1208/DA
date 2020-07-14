namespace DbLib
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("educationPlanner.persons")]
    public partial class Person
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Person()
        {
            registrations = new HashSet<Registration>();
        }

        [Key]
        public int person_id { get; set; }

        [Required]
        [StringLength(255)]
        public string firstname { get; set; }

        [Required]
        [StringLength(255)]
        public string lastname { get; set; }

        [Required]
        [StringLength(255)]
        public string email { get; set; }

        public int company_id { get; set; }

        public virtual Company company { get; set; }

        public virtual ICollection<Registration> registrations { get; set; }
    }
}
