using System;
using System.Collections.Generic;
using System.Text;

namespace GarudaHacks.Models
{
    class Test
    {
        public string Name { get; set; }
        public string Occupation { get; set; }

        public override string ToString()
        {
            return $"{Name}: {Occupation}";
        }
    }
}
