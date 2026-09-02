export interface Branch {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  slug: string;
}

export const branches: Branch[] = [
  {
    id: "1",
    name: "IEIT Main Branch",
    location: "Dhaka",
    address: "123 ICT Tower, Gulshan-1, Dhaka 1212",
    phone: "+880 1XXX-XXXXXX",
    slug: "main-branch",
  },
  {
    id: "2",
    name: "IEIT Uttara",
    location: "Uttara, Dhaka",
    address: "45 Avenue 5, Sector 4, Uttara, Dhaka 1230",
    phone: "+880 1XXX-XXXXXX",
    slug: "uttara",
  },
  {
    id: "3",
    name: "IEIT Banani",
    location: "Banani, Dhaka",
    address: "78 Road 11, Banani, Dhaka 1213",
    phone: "+880 1XXX-XXXXXX",
    slug: "banani",
  },
  {
    id: "4",
    name: "IEIT Chittagong",
    location: "Chittagong",
    address: "12 Agrabad Commercial Area, Chittagong 4100",
    phone: "+880 1XXX-XXXXXX",
    slug: "chittagong",
  },
];
