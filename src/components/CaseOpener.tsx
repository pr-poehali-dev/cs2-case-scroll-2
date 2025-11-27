import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface CaseItem {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythical';
  price: number;
}

interface CaseOpenerProps {
  caseData: {
    id: string;
    name: string;
    price: number;
    items: CaseItem[];
  };
  onClose: () => void;
}

const rarityColors = {
  common: 'from-[hsl(var(--rarity-common))]',
  uncommon: 'from-[hsl(var(--rarity-uncommon))]',
  rare: 'from-[hsl(var(--rarity-rare))]',
  epic: 'from-[hsl(var(--rarity-epic))]',
  legendary: 'from-[hsl(var(--rarity-legendary))]',
  mythical: 'from-[hsl(var(--rarity-mythical))]'
};

const rarityGlow = {
  common: 'shadow-[0_0_20px_hsl(var(--rarity-common)/0.3)]',
  uncommon: 'shadow-[0_0_20px_hsl(var(--rarity-uncommon)/0.4)]',
  rare: 'shadow-[0_0_30px_hsl(var(--rarity-rare)/0.5)]',
  epic: 'shadow-[0_0_40px_hsl(var(--rarity-epic)/0.6)]',
  legendary: 'shadow-[0_0_50px_hsl(var(--rarity-legendary)/0.7)]',
  mythical: 'shadow-[0_0_60px_hsl(var(--rarity-mythical)/0.8)]'
};

export default function CaseOpener({ caseData, onClose }: CaseOpenerProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [wonItem, setWonItem] = useState<CaseItem | null>(null);

  const generateRollItems = () => {
    const items = [...caseData.items];
    const rollSequence = [];
    
    for (let i = 0; i < 50; i++) {
      rollSequence.push(items[Math.floor(Math.random() * items.length)]);
    }
    
    return rollSequence;
  };

  const handleOpenCase = () => {
    setIsRolling(true);
    setWonItem(null);
    
    const rollItems = generateRollItems();
    const winningIndex = Math.floor(Math.random() * caseData.items.length);
    const winningItem = caseData.items[winningIndex];
    
    setTimeout(() => {
      setWonItem(winningItem);
      setIsRolling(false);
    }, 2000);
  };

  const rollItems = isRolling ? generateRollItems() : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold gold-text mb-2">{caseData.name}</h2>
            <p className="text-muted-foreground">Цена открытия: <span className="gold-text font-semibold">{caseData.price}₽</span></p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <Card className="bg-card/50 border-gold/20 p-8 mb-6">
          <div className="relative overflow-hidden h-64 rounded-lg bg-black/40 mb-6">
            <div className="absolute top-1/2 left-1/2 w-1 h-full bg-gold transform -translate-x-1/2 -translate-y-1/2 z-10 glow-gold"></div>
            
            <div className={`flex gap-4 absolute top-1/2 left-1/2 transform -translate-y-1/2 ${isRolling ? 'animate-slide-roll' : ''}`}>
              {isRolling && rollItems.map((item, index) => (
                <div
                  key={index}
                  className={`min-w-[200px] h-48 rounded-lg bg-gradient-to-b ${rarityColors[item.rarity]} to-transparent border-2 border-${item.rarity} flex flex-col items-center justify-center p-4`}
                >
                  <div className="text-6xl mb-2">{item.image}</div>
                  <p className="font-semibold text-center text-sm">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {wonItem && !isRolling && (
            <div className="text-center animate-fade-in">
              <div className={`inline-block rounded-xl bg-gradient-to-b ${rarityColors[wonItem.rarity]} to-transparent border-2 p-8 ${rarityGlow[wonItem.rarity]}`}>
                <div className="text-8xl mb-4">{wonItem.image}</div>
                <h3 className="text-2xl font-bold mb-2">{wonItem.name}</h3>
                <p className="text-muted-foreground capitalize">{wonItem.rarity}</p>
                <p className="gold-text font-bold text-xl mt-2">{wonItem.price}₽</p>
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center mt-6">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-dark text-black font-bold glow-gold"
              onClick={handleOpenCase}
              disabled={isRolling}
            >
              {isRolling ? (
                <>
                  <Icon name="Loader2" className="animate-spin mr-2" size={20} />
                  Открытие...
                </>
              ) : (
                <>
                  <Icon name="Package" className="mr-2" size={20} />
                  Открыть за {caseData.price}₽
                </>
              )}
            </Button>
            {wonItem && (
              <Button
                size="lg"
                variant="outline"
                className="border-gold text-gold hover:bg-gold/10"
              >
                <Icon name="ShoppingBag" className="mr-2" size={20} />
                Продать за {wonItem.price}₽
              </Button>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {caseData.items.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg bg-gradient-to-b ${rarityColors[item.rarity]} to-transparent border p-4 text-center transition-all hover:scale-105 ${rarityGlow[item.rarity]}`}
            >
              <div className="text-4xl mb-2">{item.image}</div>
              <p className="font-semibold text-xs mb-1">{item.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{item.rarity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
