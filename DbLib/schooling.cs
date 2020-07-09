namespace DbLib
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("educationPlanner.schoolings")]
    public partial class Schooling
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Schooling()
        {
            persons = new HashSet<Person>();
        }

        [Key]
        public int schooling_id { get; set; }

        [Required]
        [StringLength(255)]
        public string name { get; set; }

        public int address_id { get; set; }

        [Column(TypeName = "date")]
        public DateTime start { get; set; }

        [Column(TypeName = "date")]
        public DateTime end { get; set; }

        public bool reservation { get; set; }

        [Column(TypeName = "date")]
        public DateTime? reservation_date { get; set; }

        public int organizer_id { get; set; }

        public int number_of_places { get; set; }

        public virtual Address address { get; set; }

        public virtual Organizer organizer { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Person> persons { get; set; }
    }
}
