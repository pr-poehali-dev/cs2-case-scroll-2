import { useState } from 'react';
import Navigation from '@/components/Navigation';
import CaseOpener from '@/components/CaseOpener';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const mockCases = [
  {
    id: '1',
    name: 'Элитный кейс',
    price: 500,
    image: '💎',
    items: [
      { id: '1-1', name: 'AK-47 | Gold Arabesque', image: '🔫', rarity: 'legendary' as const, price: 15000 },
      { id: '1-2', name: 'AWP | Dragon Lore', image: '🎯', rarity: 'mythical' as const, price: 45000 },
      { id: '1-3', name: 'M4A4 | Howl', image: '🔥', rarity: 'legendary' as const, price: 25000 },
      { id: '1-4', name: 'Karambit | Fade', image: '🗡️', rarity: 'mythical' as const, price: 35000 },
      { id: '1-5', name: 'Glock | Fade', image: '✨', rarity: 'epic' as const, price: 5000 },
      { id: '1-6', name: 'USP-S | Kill Confirmed', image: '💀', rarity: 'epic' as const, price: 4500 }
    ]
  },
  {
    id: '2',
    name: 'Премиум кейс',
    price: 250,
    image: '🎁',
    items: [
      { id: '2-1', name: 'AK-47 | Redline', image: '🔫', rarity: 'epic' as const, price: 2500 },
      { id: '2-2', name: 'AWP | Asiimov', image: '🎯', rarity: 'epic' as const, price: 3500 },
      { id: '2-3', name: 'M4A1-S | Hyper Beast', image: '🦁', rarity: 'rare' as const, price: 1500 },
      { id: '2-4', name: 'Desert Eagle | Blaze', image: '🔥', rarity: 'rare' as const, price: 2000 },
      { id: '2-5', name: 'P90 | Asiimov', image: '⚡', rarity: 'uncommon' as const, price: 800 },
      { id: '2-6', name: 'Five-SeveN | Case Hardened', image: '💙', rarity: 'uncommon' as const, price: 600 }
    ]
  },
  {
    id: '3',
    name: 'Стандартный кейс',
    price: 100,
    image: '📦',
    items: [
      { id: '3-1', name: 'AK-47 | Case Hardened', image: '🔫', rarity: 'rare' as const, price: 1200 },
      { id: '3-2', name: 'AWP | Graphite', image: '🎯', rarity: 'rare' as const, price: 1000 },
      { id: '3-3', name: 'M4A4 | Desert-Strike', image: '🏜️', rarity: 'uncommon' as const, price: 400 },
      { id: '3-4', name: 'Glock-18 | Water Elemental', image: '💧', rarity: 'uncommon' as const, price: 350 },
      { id: '3-5', name: 'P250 | Whiteout', image: '❄️', rarity: 'common' as const, price: 150 },
      { id: '3-6', name: 'MP9 | Bulldozer', image: '🚜', rarity: 'common' as const, price: 100 }
    ]
  }
];

const mockInventory = [
  { id: 'inv-1', name: 'AK-47 | Redline', image: '🔫', rarity: 'epic' as const, price: 2500 },
  { id: 'inv-2', name: 'AWP | Asiimov', image: '🎯', rarity: 'epic' as const, price: 3500 },
  { id: 'inv-3', name: 'Karambit | Fade', image: '🗡️', rarity: 'mythical' as const, price: 35000 }
];

const mockHistory = [
  { id: 'h-1', type: 'open', caseName: 'Элитный кейс', item: 'Karambit | Fade', price: 35000, time: '5 минут назад' },
  { id: 'h-2', type: 'sell', caseName: '', item: 'AK-47 | Gold Arabesque', price: 15000, time: '10 минут назад' },
  { id: 'h-3', type: 'open', caseName: 'Премиум кейс', item: 'AWP | Asiimov', price: 3500, time: '1 час назад' }
];

export default function Index() {
  const [currentPage, setCurrentPage] = useState('home');
  const [balance, setBalance] = useState(10000);
  const [selectedCase, setSelectedCase] = useState<typeof mockCases[0] | null>(null);

  const renderHome = () => (
    <div className="space-y-12">
      <section className="text-center py-20 px-4">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 gold-text">
          CS2 CASES
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Открывай премиум кейсы и получай легендарные скины CS2
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-gold hover:bg-gold-dark text-black font-bold text-lg glow-gold" onClick={() => setCurrentPage('cases')}>
            <Icon name="Package" className="mr-2" size={24} />
            Открыть кейсы
          </Button>
          <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10 text-lg" onClick={() => setCurrentPage('deposit')}>
            <Icon name="Wallet" className="mr-2" size={24} />
            Пополнить баланс
          </Button>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold gold-text">Популярные кейсы</h2>
          <Button variant="ghost" className="text-gold hover:text-gold-light" onClick={() => setCurrentPage('cases')}>
            Все кейсы <Icon name="ArrowRight" className="ml-2" size={18} />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCases.map((caseItem) => (
            <Card key={caseItem.id} className="bg-card/50 border-gold/20 p-6 hover:border-gold/50 transition-all hover:scale-105 glow-gold cursor-pointer" onClick={() => setSelectedCase(caseItem)}>
              <div className="text-center">
                <div className="text-7xl mb-4">{caseItem.image}</div>
                <h3 className="text-2xl font-bold mb-2">{caseItem.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Icon name="Package" size={18} className="text-gold" />
                  <span className="text-muted-foreground">{caseItem.items.length} предметов</span>
                </div>
                <Button className="w-full bg-gold hover:bg-gold-dark text-black font-bold glow-gold">
                  Открыть за {caseItem.price}₽
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-card/30 border border-gold/20 rounded-xl p-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-gold">
              <Icon name="Shield" size={32} className="text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-2">100% Честность</h3>
            <p className="text-muted-foreground">Проверяемая система честности</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-gold">
              <Icon name="Zap" size={32} className="text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-2">Моментальный вывод</h3>
            <p className="text-muted-foreground">Получай скины сразу после выигрыша</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-gold">
              <Icon name="Headphones" size={32} className="text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-2">Поддержка 24/7</h3>
            <p className="text-muted-foreground">Всегда готовы помочь</p>
          </div>
        </div>
      </section>
    </div>
  );

  const renderCases = () => (
    <div>
      <h2 className="text-4xl font-bold gold-text mb-8">Все кейсы</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCases.map((caseItem) => (
          <Card key={caseItem.id} className="bg-card/50 border-gold/20 p-6 hover:border-gold/50 transition-all hover:scale-105 glow-gold cursor-pointer" onClick={() => setSelectedCase(caseItem)}>
            <div className="text-center">
              <div className="text-7xl mb-4">{caseItem.image}</div>
              <h3 className="text-2xl font-bold mb-2">{caseItem.name}</h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Icon name="Package" size={18} className="text-gold" />
                <span className="text-muted-foreground">{caseItem.items.length} предметов</span>
              </div>
              <Button className="w-full bg-gold hover:bg-gold-dark text-black font-bold glow-gold">
                Открыть за {caseItem.price}₽
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderInventory = () => (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold gold-text">Инвентарь</h2>
        <div className="text-muted-foreground">
          Общая стоимость: <span className="gold-text font-bold text-xl">{mockInventory.reduce((sum, item) => sum + item.price, 0).toLocaleString()}₽</span>
        </div>
      </div>
      {mockInventory.length === 0 ? (
        <Card className="bg-card/50 border-gold/20 p-12 text-center">
          <Icon name="Package" size={64} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-xl text-muted-foreground mb-4">Инвентарь пуст</p>
          <Button className="bg-gold hover:bg-gold-dark text-black font-bold glow-gold" onClick={() => setCurrentPage('cases')}>
            Открыть кейс
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockInventory.map((item) => (
            <Card key={item.id} className="bg-card/50 border-gold/20 p-4 hover:border-gold/50 transition-all hover:scale-105">
              <div className="text-center">
                <div className="text-5xl mb-3">{item.image}</div>
                <h3 className="font-bold mb-1 text-sm">{item.name}</h3>
                <Badge className="mb-2 capitalize">{item.rarity}</Badge>
                <p className="gold-text font-bold">{item.price.toLocaleString()}₽</p>
                <Button size="sm" variant="outline" className="w-full mt-2 border-gold/30 text-gold hover:bg-gold/10">
                  Продать
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderHistory = () => (
    <div>
      <h2 className="text-4xl font-bold gold-text mb-8">История</h2>
      <Card className="bg-card/50 border-gold/20">
        <div className="divide-y divide-border">
          {mockHistory.map((record) => (
            <div key={record.id} className="p-6 hover:bg-muted/20 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${record.type === 'open' ? 'bg-gold/20' : 'bg-green-500/20'} flex items-center justify-center`}>
                    <Icon name={record.type === 'open' ? 'Package' : 'ShoppingBag'} size={24} className={record.type === 'open' ? 'text-gold' : 'text-green-500'} />
                  </div>
                  <div>
                    <p className="font-bold">{record.item}</p>
                    {record.caseName && <p className="text-sm text-muted-foreground">из {record.caseName}</p>}
                    <p className="text-xs text-muted-foreground">{record.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${record.type === 'open' ? 'text-gold' : 'text-green-500'}`}>
                    {record.type === 'open' ? '+' : ''}{record.price.toLocaleString()}₽
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderProfile = () => (
    <div>
      <h2 className="text-4xl font-bold gold-text mb-8">Профиль</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-card/50 border-gold/20 p-6 text-center">
          <Icon name="User" size={48} className="text-gold mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Player_123</h3>
          <p className="text-muted-foreground">Уровень 15</p>
        </Card>
        <Card className="bg-card/50 border-gold/20 p-6 text-center">
          <Icon name="Package" size={48} className="text-gold mx-auto mb-4" />
          <h3 className="text-3xl font-bold gold-text mb-2">247</h3>
          <p className="text-muted-foreground">Открыто кейсов</p>
        </Card>
        <Card className="bg-card/50 border-gold/20 p-6 text-center">
          <Icon name="Trophy" size={48} className="text-gold mx-auto mb-4" />
          <h3 className="text-3xl font-bold gold-text mb-2">128,450₽</h3>
          <p className="text-muted-foreground">Всего выиграно</p>
        </Card>
      </div>
    </div>
  );

  const renderDeposit = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold gold-text mb-8">Пополнение баланса</h2>
      <Card className="bg-card/50 border-gold/20 p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Сумма пополнения</label>
          <Input type="number" placeholder="1000" className="text-lg h-12" />
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[500, 1000, 2500, 5000, 10000, 25000].map((amount) => (
            <Button key={amount} variant="outline" className="border-gold/30 hover:bg-gold/10">
              {amount}₽
            </Button>
          ))}
        </div>
        <div className="space-y-3 mb-6">
          <Button className="w-full bg-gold hover:bg-gold-dark text-black font-bold h-12 glow-gold">
            <Icon name="CreditCard" className="mr-2" size={20} />
            Банковская карта
          </Button>
          <Button variant="outline" className="w-full border-gold/30 h-12">
            <Icon name="Smartphone" className="mr-2" size={20} />
            СБП
          </Button>
          <Button variant="outline" className="w-full border-gold/30 h-12">
            <Icon name="Wallet" className="mr-2" size={20} />
            Криптовалюта
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderFAQ = () => (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold gold-text mb-8">Часто задаваемые вопросы</h2>
      <Card className="bg-card/50 border-gold/20 p-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Как открыть кейс?</AccordionTrigger>
            <AccordionContent>
              Выберите кейс, который хотите открыть, нажмите кнопку "Открыть" и наблюдайте за прокруткой. Выигранный предмет автоматически попадет в ваш инвентарь.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Как вывести выигрыш?</AccordionTrigger>
            <AccordionContent>
              Предметы из инвентаря можно продать за внутриигровую валюту, которую затем можно вывести на банковскую карту или электронный кошелек.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Безопасно ли пополнять баланс?</AccordionTrigger>
            <AccordionContent>
              Да, все платежи проходят через защищенные каналы связи. Мы используем проверенные платежные системы с сертификатами безопасности.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Какие шансы выпадения предметов?</AccordionTrigger>
            <AccordionContent>
              Шансы зависят от редкости: Common - 50%, Uncommon - 25%, Rare - 15%, Epic - 7%, Legendary - 2.5%, Mythical - 0.5%.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );

  const renderShop = () => (
    <div>
      <h2 className="text-4xl font-bold gold-text mb-8">Магазин</h2>
      <p className="text-center text-muted-foreground text-xl py-12">Скоро здесь появятся эксклюзивные предметы!</p>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return renderHome();
      case 'cases': return renderCases();
      case 'inventory': return renderInventory();
      case 'shop': return renderShop();
      case 'history': return renderHistory();
      case 'profile': return renderProfile();
      case 'deposit': return renderDeposit();
      case 'faq': return renderFAQ();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} balance={balance} />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      {selectedCase && (
        <CaseOpener caseData={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </div>
  );
}
