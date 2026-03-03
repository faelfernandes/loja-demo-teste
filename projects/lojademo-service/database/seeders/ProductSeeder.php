<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    private const CATEGORY_TENIS = 'Tênis';
    private const CATEGORY_ROUPAS = 'Roupas Esportivas';
    private const CATEGORY_ACESSORIOS = 'Acessórios';
    private const CATEGORY_EQUIPAMENTOS = 'Equipamentos';

    public function run(): void
    {
        $categories = Category::all()->keyBy('name');
        if ($categories->isEmpty()) {
            return;
        }

        $products = $this->productsData();

        foreach ($products as $data) {
            $category = $categories->get($data['category_name']);
            if ($category === null) {
                continue;
            }

            Product::updateOrCreate(
                ['name' => $data['name']],
                [
                    'description' => $data['description'],
                    'price' => $data['price'], // centavos (int)
                    'category_id' => $category->id,
                    'image_url' => $data['image_url'],
                ]
            );
        }
    }

    /** @return array<int, array{name: string, description: string, price: int, category_name: string, image_url: string}> */
    private function productsData(): array
    {
        return array_merge(
            $this->productsTenis(),
            $this->productsRoupas(),
            $this->productsAcessorios(),
            $this->productsEquipamentos()
        );
    }

    /** @return array<int, array{name: string, description: string, price: int, category_name: string, image_url: string}> */
    private function productsTenis(): array
    {
        return [
            ['name' => 'Nike Air Max 270 React', 'description' => 'O primeiro Air Max de estilo de vida da Nike oferece energia, atitude e conforto a cada passo.', 'price' => 89999, 'category_name' => self::CATEGORY_TENIS, 'image_url' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Adidas Ultraboost 22', 'description' => 'Tênis de corrida de alta performance com retorno de energia incrível e ajuste perfeito.', 'price' => 99900, 'category_name' => self::CATEGORY_TENIS, 'image_url' => 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Puma RS-X3 Puzzle', 'description' => 'Design retrô e exagerado com tecnologia de amortecimento RS para máximo conforto.', 'price' => 54990, 'category_name' => self::CATEGORY_TENIS, 'image_url' => 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'New Balance 574 Core', 'description' => 'O clássico de todos os tempos. Conforto duradouro e estilo inconfundível.', 'price' => 69900, 'category_name' => self::CATEGORY_TENIS, 'image_url' => 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Asics Gel Kayano 29', 'description' => 'Tênis de estabilidade para corrida com amortecimento Gel e suporte para pisada pronada.', 'price' => 84990, 'category_name' => self::CATEGORY_TENIS, 'image_url' => 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Mizuno Wave Rider 26', 'description' => 'Leve e responsivo, ideal para treinos longos e ritmo constante.', 'price' => 72900, 'category_name' => self::CATEGORY_TENIS, 'image_url' => 'https://images.unsplash.com/photo-1460353581641-37bddab7a187?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Brooks Ghost 15', 'description' => 'Amortecimento DNA LOFT para corridas diárias. Conforto neutro em cada passada.', 'price' => 79900, 'category_name' => self::CATEGORY_TENIS, 'image_url' => 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Hoka Clifton 9', 'description' => 'Amortecimento máximo com solado em EVA. Leve e estável para longas distâncias.', 'price' => 89900, 'category_name' => self::CATEGORY_TENIS, 'image_url' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Saucony Triumph 21', 'description' => 'Tênis de corrida premium com PWRRUN+. Conforto e durabilidade para quilômetros.', 'price' => 75900, 'category_name' => self::CATEGORY_TENIS, 'image_url' => 'https://images.unsplash.com/photo-1460353581641-37bddab7a187?auto=format&fit=crop&q=80&w=800'],
        ];
    }

    /** @return array<int, array{name: string, description: string, price: int, category_name: string, image_url: string}> */
    private function productsRoupas(): array
    {
        return [
            ['name' => 'Pro Yoga Leggings', 'description' => 'Leggings de cintura alta com tecido antiumidade. Perfeitas para yoga ou treinos intensos.', 'price' => 24950, 'category_name' => self::CATEGORY_ROUPAS, 'image_url' => 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Sport Windbreaker Jacket', 'description' => 'Jaqueta corta-vento leve e resistente à água para corridas matinais.', 'price' => 34990, 'category_name' => self::CATEGORY_ROUPAS, 'image_url' => 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Camiseta Dry Fit Under Armour', 'description' => 'Tecido super leve e respirável que afasta o suor e seca rapidamente durante o treino.', 'price' => 12999, 'category_name' => self::CATEGORY_ROUPAS, 'image_url' => 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Shorts de Corrida Adidas', 'description' => 'Liberdade de movimento total com sunga interna e bolso para chaves.', 'price' => 17990, 'category_name' => self::CATEGORY_ROUPAS, 'image_url' => 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Jaqueta Corta-Vento Nike Running', 'description' => 'Proteção contra vento e chuva leve. Capuz recolhível e bolsos com zip.', 'price' => 42990, 'category_name' => self::CATEGORY_ROUPAS, 'image_url' => 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Top Esportivo Suporte Alto', 'description' => 'Suporte para seios em atividades de alto impacto. Tecido respirável e elástico.', 'price' => 16990, 'category_name' => self::CATEGORY_ROUPAS, 'image_url' => 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Calça Legging Térmica', 'description' => 'Segunda pele para treinos ao ar livre no frio. Mantém o calor sem limitar o movimento.', 'price' => 27990, 'category_name' => self::CATEGORY_ROUPAS, 'image_url' => 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Regata Compressão Masculina', 'description' => 'Tecido de compressão que melhora a recuperação muscular. Secagem rápida.', 'price' => 14990, 'category_name' => self::CATEGORY_ROUPAS, 'image_url' => 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Colete Refletivo Noturno', 'description' => 'Segurança para corridas e pedaladas à noite. Faixas refletivas 360° e ajuste elástico.', 'price' => 6990, 'category_name' => self::CATEGORY_ROUPAS, 'image_url' => 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Segunda Pele Masculina Longa', 'description' => 'Manga longa térmica e respirável. Base para camadas em dias frios.', 'price' => 19990, 'category_name' => self::CATEGORY_ROUPAS, 'image_url' => 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800'],
        ];
    }

    /** @return array<int, array{name: string, description: string, price: int, category_name: string, image_url: string}> */
    private function productsAcessorios(): array
    {
        return [
            ['name' => 'Gym Duffle Bag 40L', 'description' => 'Bolsa de academia espaçosa com compartimento separado para tênis e roupas úmidas.', 'price' => 19900, 'category_name' => self::CATEGORY_ACESSORIOS, 'image_url' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Smart Fitness Watch', 'description' => 'Monitore seus batimentos, passos e calorias com design minimalista e esportivo.', 'price' => 65000, 'category_name' => self::CATEGORY_ACESSORIOS, 'image_url' => 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Boné Esportivo Nike Dri-FIT', 'description' => 'Aba curva e tecnologia de absorção de suor para manter você fresco e focado.', 'price' => 14990, 'category_name' => self::CATEGORY_ACESSORIOS, 'image_url' => 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Garrafa Térmica Inox 1L', 'description' => 'Mantém a água gelada por até 24 horas. Essencial para hidratação pesada.', 'price' => 21000, 'category_name' => self::CATEGORY_ACESSORIOS, 'image_url' => 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Pulseira de Pulso para Celular', 'description' => 'Corra com o celular seguro no braço. Ajuste por velcro e material à prova d\'água.', 'price' => 4990, 'category_name' => self::CATEGORY_ACESSORIOS, 'image_url' => 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Fone de Ouvido Esportivo Bluetooth', 'description' => 'Resistente ao suor e à água. Gancho de orelha para não cair durante o treino.', 'price' => 29900, 'category_name' => self::CATEGORY_ACESSORIOS, 'image_url' => 'https://images.unsplash.com/photo-1577174881658-45a93d7b8a9b?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Meia Técnica Anti-odor', 'description' => 'Meia de compressão leve com tecnologia que reduz odores. Pacote com 3 pares.', 'price' => 8990, 'category_name' => self::CATEGORY_ACESSORIOS, 'image_url' => 'https://images.unsplash.com/photo-1586351103902-4b1af3b91535?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Óculos de Natação Antinévoa', 'description' => 'Lentes polarizadas e vedação de silicone antinévoa. Inclui case e cordão.', 'price' => 7900, 'category_name' => self::CATEGORY_ACESSORIOS, 'image_url' => 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Cinto de Hidratação 2L', 'description' => 'Cinto com bolsos e reservatório de água para trilhas e corridas longas.', 'price' => 15900, 'category_name' => self::CATEGORY_ACESSORIOS, 'image_url' => 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Relógio Cardíaco com GPS', 'description' => 'Monitor de frequência cardíaca no pulso, GPS integrado e resistência à água.', 'price' => 44900, 'category_name' => self::CATEGORY_ACESSORIOS, 'image_url' => 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Toalha Microfibra Esportiva', 'description' => 'Absorção rápida e compacta. Seca em minutos e cabe em qualquer bolso.', 'price' => 3990, 'category_name' => self::CATEGORY_ACESSORIOS, 'image_url' => 'https://images.unsplash.com/photo-1586351103902-4b1af3b91535?auto=format&fit=crop&q=80&w=800'],
        ];
    }

    /** @return array<int, array{name: string, description: string, price: int, category_name: string, image_url: string}> */
    private function productsEquipamentos(): array
    {
        return [
            ['name' => 'Premium Yoga Mat', 'description' => 'Tapete de yoga com alinhamento corporal e aderência superior. 6mm de espessura.', 'price' => 18000, 'category_name' => self::CATEGORY_EQUIPAMENTOS, 'image_url' => 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Adjustable Dumbbell Set', 'description' => 'Kit de halteres ajustáveis de 2kg a 24kg. Ideal para treinos em casa.', 'price' => 125000, 'category_name' => self::CATEGORY_EQUIPAMENTOS, 'image_url' => 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Corda de Pular Profissional', 'description' => 'Corda de aço revestida com rolamentos de alta velocidade para treinos de crossfit.', 'price' => 8950, 'category_name' => self::CATEGORY_EQUIPAMENTOS, 'image_url' => 'https://images.unsplash.com/photo-1515775538093-d2d95c5ee4f5?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Roda Abdominal Pro', 'description' => 'Fortaleça o core com estabilidade extra e pegadas emborrachadas.', 'price' => 11500, 'category_name' => self::CATEGORY_EQUIPAMENTOS, 'image_url' => 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Kettlebell 12kg', 'description' => 'Ferro fundido com revestimento antiderrapante. Ideal para treinos funcionais.', 'price' => 18900, 'category_name' => self::CATEGORY_EQUIPAMENTOS, 'image_url' => 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Faixa de Resistência 5 Níveis', 'description' => 'Kit com 5 elásticos de resistência progressiva. Inclui bolsa e guia de exercícios.', 'price' => 12900, 'category_name' => self::CATEGORY_EQUIPAMENTOS, 'image_url' => 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Colchonete de Pilates 15mm', 'description' => 'Espessura extra para conforto em exercícios no chão. Superfície antiderrapante.', 'price' => 21900, 'category_name' => self::CATEGORY_EQUIPAMENTOS, 'image_url' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Barra Olímpica 20kg', 'description' => 'Barra de 1,80m com rotação. Capacidade até 300kg para levantamento de peso.', 'price' => 59900, 'category_name' => self::CATEGORY_EQUIPAMENTOS, 'image_url' => 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'Rolo de Liberação Miofascial', 'description' => 'Automasagem para recuperação muscular. Superfície em EVA de alta densidade.', 'price' => 12900, 'category_name' => self::CATEGORY_EQUIPAMENTOS, 'image_url' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800'],
        ];
    }
}
