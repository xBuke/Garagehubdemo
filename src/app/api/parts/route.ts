import { NextResponse } from 'next/server';

const partsData = [
  {
    "id": "PART-001",
    "name": "Brake Pads - Front",
    "category": "Brakes",
    "manufacturer": "Brembo",
    "partNumber": "P85020",
    "stockQuantity": 24,
    "minStockLevel": 10,
    "unitPrice": 45.99,
    "location": "A-12",
    "supplier": "Auto Parts Plus",
    "lastUpdated": "2025-10-02T10:30:00.000Z",
    "status": "in_stock"
  },
  {
    "id": "PART-002", 
    "name": "Engine Oil Filter",
    "category": "Engine",
    "manufacturer": "Mann",
    "partNumber": "W712/75",
    "stockQuantity": 5,
    "minStockLevel": 15,
    "unitPrice": 12.50,
    "location": "B-08",
    "supplier": "Filter Pro",
    "lastUpdated": "2025-10-01T14:20:00.000Z",
    "status": "low_stock"
  },
  {
    "id": "PART-003",
    "name": "Spark Plugs Set",
    "category": "Engine", 
    "manufacturer": "NGK",
    "partNumber": "BKR6E-11",
    "stockQuantity": 36,
    "minStockLevel": 20,
    "unitPrice": 8.75,
    "location": "C-15",
    "supplier": "Ignition World",
    "lastUpdated": "2025-09-28T09:15:00.000Z",
    "status": "in_stock"
  },
  {
    "id": "PART-004",
    "name": "Air Filter",
    "category": "Engine",
    "manufacturer": "K&N",
    "partNumber": "33-2945",
    "stockQuantity": 0,
    "minStockLevel": 8,
    "unitPrice": 25.99,
    "location": "D-03",
    "supplier": "Performance Parts",
    "lastUpdated": "2025-09-30T16:45:00.000Z",
    "status": "out_of_stock"
  },
  {
    "id": "PART-005",
    "name": "Radiator Coolant",
    "category": "Cooling",
    "manufacturer": "Motul",
    "partNumber": "MOT-COOL-5L",
    "stockQuantity": 18,
    "minStockLevel": 12,
    "unitPrice": 19.99,
    "location": "E-07",
    "supplier": "Fluid Dynamics",
    "lastUpdated": "2025-10-01T11:30:00.000Z",
    "status": "in_stock"
  },
  {
    "id": "PART-006",
    "name": "Brake Discs - Rear",
    "category": "Brakes",
    "manufacturer": "TRW",
    "partNumber": "DF4823S",
    "stockQuantity": 8,
    "minStockLevel": 6,
    "unitPrice": 89.99,
    "location": "A-15",
    "supplier": "Auto Parts Plus",
    "lastUpdated": "2025-09-29T13:20:00.000Z",
    "status": "in_stock"
  }
];

export async function GET() {
  return NextResponse.json(partsData);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newPart = {
    id: `PART-${Date.now()}`,
    ...body,
    lastUpdated: new Date().toISOString(),
  };
  
  return NextResponse.json(newPart, { status: 201 });
}
