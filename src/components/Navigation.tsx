import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  balance: number;
}

export default function Navigation({ currentPage, onNavigate, balance }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'cases', label: 'Кейсы', icon: 'Package' },
    { id: 'inventory', label: 'Инвентарь', icon: 'Backpack' },
    { id: 'shop', label: 'Магазин', icon: 'Store' },
    { id: 'history', label: 'История', icon: 'History' },
    { id: 'profile', label: 'Профиль', icon: 'User' }
  ];

  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center glow-gold">
              <Icon name="Sparkles" size={24} className="text-black" />
            </div>
            <h1 className="text-xl font-bold gold-text">CS2 CASES</h1>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onNavigate(item.id)}
                className={currentPage === item.id ? 'bg-gold text-black hover:bg-gold-dark' : 'hover:text-gold'}
              >
                <Icon name={item.icon as any} size={18} className="mr-2" />
                {item.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-card border border-gold/30 rounded-lg px-4 py-2 glow-gold">
              <div className="flex items-center gap-2">
                <Icon name="Wallet" size={18} className="text-gold" />
                <span className="font-bold gold-text">{balance.toLocaleString()}₽</span>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-gold hover:bg-gold-dark text-black font-bold glow-gold"
              onClick={() => onNavigate('deposit')}
            >
              <Icon name="Plus" size={18} className="mr-1" />
              Пополнить
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('faq')}
              className="hover:text-gold"
            >
              <Icon name="HelpCircle" size={20} />
            </Button>
          </div>
        </div>

        <div className="md:hidden flex gap-2 mt-4 overflow-x-auto pb-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={currentPage === item.id ? 'bg-gold text-black hover:bg-gold-dark' : 'border-gold/30'}
            >
              <Icon name={item.icon as any} size={16} className="mr-1" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
