# 🚗 GarageHub - SaaS Demo Web App for Auto Mechanics

A complete, modern SaaS solution for auto mechanics and garage management built with Next.js 15, TypeScript, and Tailwind CSS.

![GarageHub Dashboard](https://img.shields.io/badge/Status-Live%20Demo-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC)

## 🌟 Features

### 📊 **Dashboard**
- Real-time statistics and KPIs
- Quick action buttons
- Recent activity feed
- Urgent alerts and notifications

### 👥 **Lead Management**
- Track potential customers
- Urgent lead flagging
- Contact information management
- Convert leads to bookings

### 💬 **Multi-Channel Messaging**
- **WhatsApp** integration
- **Facebook** messages
- **Instagram** DMs
- **SMS** support
- Channel-specific filtering
- Urgent message alerts

### 📅 **Booking System**
- Calendar view with filtering
- Today/Upcoming/Past bookings
- Service type management
- Customer notes and details
- Urgent booking prioritization

### 🧑‍🤝‍🧑 **Customer Management**
- Complete customer database
- Contact information
- Vehicle associations
- Service history tracking

### 🚗 **Vehicle Management**
- Car model tracking
- Customer-vehicle relationships
- Service history per vehicle
- Quick booking creation

### ⚙️ **Settings & Configuration**
- Profile management
- Notification preferences
- Security settings
- Data export/import

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Radix UI primitives
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Charts:** Recharts (ready for implementation)
- **Development:** Turbopack for fast refresh

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/xBuke/Garagehubdemo.git
   cd Garagehubdemo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Main dashboard with statistics |
| `/leads` | Lead management system |
| `/messages` | Multi-channel messaging |
| `/bookings` | Appointment calendar |
| `/customers` | Customer database |
| `/cars` | Vehicle management |
| `/settings` | Application settings |

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── leads/         # Lead management API
│   │   ├── messages/      # Messaging API
│   │   ├── bookings/      # Booking API
│   │   ├── customers/     # Customer API
│   │   └── cars/          # Vehicle API
│   ├── leads/             # Lead management page
│   ├── messages/          # Messaging page
│   ├── bookings/          # Booking page
│   ├── customers/         # Customer page
│   ├── cars/              # Vehicle page
│   └── settings/          # Settings page
├── components/            # Reusable components
│   ├── ui/               # UI primitives
│   ├── navigation.tsx    # Sidebar navigation
│   └── dashboard-stats.tsx # Dashboard statistics
├── data/                 # JSON data files
│   ├── leads.json        # Sample lead data
│   ├── messages.json     # Sample message data
│   ├── bookings.json     # Sample booking data
│   ├── customers.json    # Sample customer data
│   ├── cars.json         # Sample vehicle data
│   └── services.json     # Service types
└── lib/                  # Utilities and types
    ├── types.ts          # TypeScript definitions
    └── utils.ts          # Utility functions
```

## 🎨 UI/UX Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern Interface** - Clean, professional design
- **Dark Mode Ready** - CSS variables for easy theming
- **Accessibility** - ARIA labels and keyboard navigation
- **Loading States** - Skeleton loaders for better UX
- **Error Handling** - Graceful error states
- **Urgent Alerts** - Visual indicators for priority items

## 📊 Data Management

The application uses JSON files for demo purposes. In production, you would integrate with:

- **Database:** PostgreSQL, MySQL, or MongoDB
- **Authentication:** NextAuth.js, Auth0, or Supabase
- **Real-time:** WebSockets or Server-Sent Events
- **File Storage:** AWS S3, Cloudinary, or similar

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/leads` | GET, POST | Manage leads |
| `/api/messages` | GET, POST | Handle messages |
| `/api/bookings` | GET, POST | Booking operations |
| `/api/customers` | GET | Customer data |
| `/api/cars` | GET | Vehicle information |
| `/api/services` | GET | Service types |

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms

- **Netlify:** `npm run build && npm run export`
- **Railway:** Direct GitHub integration
- **Digital Ocean:** Docker deployment ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**xBuke**
- GitHub: [@xBuke](https://github.com/xBuke)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Radix UI for accessible component primitives
- Lucide for beautiful icons

---

**Live Demo:** [http://localhost:3000](http://localhost:3000) (when running locally)

**Repository:** [https://github.com/xBuke/Garagehubdemo.git](https://github.com/xBuke/Garagehubdemo.git)