﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schulungskalender.Models {
    public class AddressRessource {
        public int Id { get; set; }
        public int StreetNumber { get; set; }
        public string Street { get; set; }
        public int ZipCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public override string ToString() {
            if(StreetNumber == 0 || Street == null) {
                if(ZipCode == 0) {
                    return City;
                }
                return ZipCode + " " + City;
            }
            return Street + " " + StreetNumber + ", " + ZipCode + " " + City;
        }
    }
}
