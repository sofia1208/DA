using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations.Model;
using System.Linq;
using System.Threading.Tasks;

namespace DA.Models.DTOs {
    public class LoginUser {
        public string username { get; set; }
        public string password { get; set; }
    }
}
