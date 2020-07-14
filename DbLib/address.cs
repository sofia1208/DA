namespace DbLib
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("educationPlanner.addresses")]
    public partial class Address
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Address()
        {
            companies = new HashSet<Company>();
            schoolings = new HashSet<Schooling>();
        }

        [Key]
        public int address_id { get; set; }

        [Required]
        [StringLength(255)]
        public string street { get; set; }

        public int street_number { get; set; }

        public int zip_code { get; set; }

        [Required]
        [StringLength(255)]
        public string city { get; set; }

        [Required]
        [StringLength(255)]
        public string country { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Company> companies { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Schooling> schoolings { get; set; }
    }
}
