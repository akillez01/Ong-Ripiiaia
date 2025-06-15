import { motion } from 'framer-motion';
import { ChevronDown, Filter, Minus, Plus, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data
const products = [
  {
    id: '1',
    name: 'Hinário O Cruzeiro - Edição de Bolso',
    description: 'Hinário completo do Mestre Irineu em tamanho de bolso, facilitando o manuseio durante os trabalhos.',
    price: 35.00,
    imageUrl: 'https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'hinarios',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'CD - Nova Dimensão',
    description: 'Coletânea de hinos gravados em estúdio com arranjos de alta qualidade.',
    price: 30.00,
    imageUrl: 'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'musica',
    inStock: true,
    featured: false
  },
  {
    id: '3',
    name: 'Camiseta - Estrela do Oriente',
    description: 'Camiseta 100% algodão com estampa da estrela de seis pontas.',
    price: 45.00,
    imageUrl: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'vestuario',
    inStock: true,
    featured: true
  },
  {
    id: '4',
    name: 'Coletânea de Partituras',
    description: 'Livro com partituras dos principais hinos da doutrina, incluindo cifras para violão.',
    price: 75.00,
    imageUrl: 'https://images.pexels.com/photos/6966/abstract-music-rock-bw.jpg?auto=compress&cs=tinysrgb&w=600',
    category: 'livros',
    inStock: true,
    featured: false
  },
  {
    id: '5',
    name: 'Colar - Jagube e Rainha',
    description: 'Colar artesanal com símbolos do Jagube e da Rainha.',
    price: 60.00,
    imageUrl: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'artesanato',
    inStock: false,
    featured: true
  },
  {
    id: '6',
    name: 'Box Hinários Oficiais',
    description: 'Conjunto com os 5 hinários oficiais da doutrina em edição especial de capa dura.',
    price: 180.00,
    imageUrl: 'https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'hinarios',
    inStock: true,
    featured: true
  }
];

const categories = [
  { name: 'Todos', slug: 'todos' },
  { name: 'Hinários', slug: 'hinarios' },
  { name: 'Música', slug: 'musica' },
  { name: 'Vestuário', slug: 'vestuario' },
  { name: 'Livros', slug: 'livros' },
  { name: 'Artesanato', slug: 'artesanato' }
];

const LojaPage = () => {
  const [cartItems, setCartItems] = useState<{id: string, quantity: number}[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredProducts = activeCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === activeCategory);
    
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const addToCart = (productId: string) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === productId);
      if (exists) {
        return prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prev, { id: productId, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCartItems(prev => {
      const item = prev.find(item => item.id === productId);
      
      if (item && item.quantity === 1) {
        return prev.filter(item => item.id !== productId);
      }
      
      return prev.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    });
  };
  
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Loja Ripi ia iá
            </h1>
            <p className="text-lg text-primary-100 mb-8">
              Adquira hinários, CDs, livros e produtos relacionados à doutrina do Santo Daime.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container-custom">
          {/* Desktop Categories */}
          <div className="hidden md:flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-lg shadow-sm p-1">
              {categories.map(category => (
                <button
                  key={category.slug}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    activeCategory === category.slug
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveCategory(category.slug)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile Categories */}
          <div className="md:hidden mb-6">
            <button
              className="w-full flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
              onClick={toggleFilters}
            >
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-medium">
                  {categories.find(c => c.slug === activeCategory)?.name || 'Todos os Produtos'}
                </span>
              </div>
              <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            {showFilters && (
              <div className="mt-2 bg-white rounded-lg shadow-md p-2">
                {categories.map(category => (
                  <button
                    key={category.slug}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-md ${
                      activeCategory === category.slug
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      setActiveCategory(category.slug);
                      setShowFilters(false);
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="card overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                  
                  {product.featured && (
                    <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded">
                      Destaque
                    </div>
                  )}
                  
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-600 text-white font-medium px-3 py-1 rounded">
                        Esgotado
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <span className="text-primary-700 font-semibold">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 capitalize">
                      {product.category}
                    </span>
                    
                    <button
                      className={`btn ${
                        product.inStock 
                          ? 'btn-primary text-sm px-3 py-1.5' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed text-sm px-3 py-1.5'
                      }`}
                      onClick={() => product.inStock && addToCart(product.id)}
                      disabled={!product.inStock}
                    >
                      {
                        cartItems.some(item => item.id === product.id)
                          ? 'Adicionado'
                          : 'Adicionar'
                      }
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA */}
          <div className="bg-primary-50 rounded-lg p-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Produtos Personalizados
              </h2>
              <p className="text-gray-600 mb-6">
                Você está procurando por um produto específico? Entre em contato conosco 
                para solicitar produtos personalizados ou verificar a disponibilidade de 
                itens que não estão listados.
              </p>
              <Link to="/contato" className="btn btn-primary">
                Entrar em contato
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Shopping Cart */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-4 right-4 z-40">
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => setShowCart(true)}
            className="bg-primary-600 text-white rounded-full p-3 shadow-lg hover:bg-primary-700 transition-colors relative"
          >
            <ShoppingCart className="h-6 w-6" />
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </div>
          </motion.button>
        </div>
      )}
      
      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCart(false)}
          ></div>
          
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full sm:w-96 bg-white shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Carrinho de Compras</h3>
                    <button
                      onClick={() => setShowCart(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Seu carrinho está vazio</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map(item => {
                        const product = products.find(p => p.id === item.id);
                        if (!product) return null;
                        
                        return (
                          <div key={item.id} className="flex border-b pb-4">
                            <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="ml-4 flex-1">
                              <h4 className="font-medium text-sm">{product.name}</h4>
                              <p className="text-primary-700 text-sm font-medium mt-1">
                                R$ {product.price.toFixed(2)}
                              </p>
                              
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center border rounded">
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="px-2 py-1 text-gray-600 hover:text-gray-800"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="px-2 text-sm">{item.quantity}</span>
                                  <button
                                    onClick={() => addToCart(item.id)}
                                    className="px-2 py-1 text-gray-600 hover:text-gray-800"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                                
                                <p className="text-sm font-medium">
                                  R$ {(product.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-medium">R$ {getCartTotal().toFixed(2)}</span>
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-4">
                    Impostos e frete calculados no checkout
                  </p>
                  
                  <button 
                    className="w-full btn btn-primary"
                    disabled={cartItems.length === 0}
                  >
                    Finalizar Compra
                  </button>
                  
                  <button
                    className="w-full text-center text-sm text-primary-600 hover:text-primary-700 mt-2"
                    onClick={() => setShowCart(false)}
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LojaPage;