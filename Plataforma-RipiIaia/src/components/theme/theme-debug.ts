/**
 * Este script injeta um pequeno botão de alternância de tema para depuração
 * É adicionado apenas em desenvolvimento e pode ser removido em produção
 */
 
const STORAGE_KEY = 'ripiiaia-ui-theme';

// Verificar se estamos em ambiente de desenvolvimento
if (import.meta.env.DEV) {
  // Criar o botão
  const createDebugButton = () => {
    // Verificar tema atual
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    
    // Criar botão de debug
    const btn = document.createElement('button');
    btn.id = 'theme-debug-button';
    btn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
    btn.title = `Debug: Alternar tema (atual: ${currentTheme})`;
    
    // Estilizar botão
    Object.assign(btn.style, {
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      zIndex: '9999',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: currentTheme === 'dark' ? '#333' : '#fff',
      color: currentTheme === 'dark' ? '#fff' : '#000',
      border: '2px solid #D1B070',
      fontSize: '18px',
      cursor: 'pointer',
      opacity: '0.8',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });
    
    // Efeito de hover
    btn.addEventListener('mouseenter', () => {
      btn.style.opacity = '1';
      btn.style.transform = 'scale(1.1)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.opacity = '0.8';
      btn.style.transform = 'scale(1)';
    });
    
    // Alternar tema ao clicar
    btn.addEventListener('click', () => {
      const html = document.documentElement;
      const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Remover classes atuais
      html.classList.remove('dark', 'light');
      
      // Adicionar nova classe
      html.classList.add(newTheme);
      
      // Atualizar atributo data-theme
      html.setAttribute('data-theme', newTheme);
      
      // Salvar no localStorage
      localStorage.setItem(STORAGE_KEY, newTheme);
      
      // Atualizar estilos do botão
      btn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
      btn.style.backgroundColor = newTheme === 'dark' ? '#333' : '#fff';
      btn.style.color = newTheme === 'dark' ? '#fff' : '#000';
      btn.title = `Debug: Alternar tema (atual: ${newTheme})`;
      
      // Aplicar cores ao body também
      document.body.style.backgroundColor = newTheme === 'dark' ? '#3A3532' : '#FBF9F5';
      document.body.style.color = newTheme === 'dark' ? '#D9A66C' : '#334155';
      
      // Log para debug
      console.log(`[ThemeDebug] Tema alterado para: ${newTheme}`);
    });
    
    // Adicionar ao DOM
    document.body.appendChild(btn);
    console.log('[ThemeDebug] Botão de debug de tema adicionado');
  };

  // Adicionar botão quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createDebugButton);
  } else {
    setTimeout(createDebugButton, 1000);
  }
}

export { };

