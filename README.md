# ⏱️ Timer de Sessões de Estudo

> **Temporizador Pomodoro em React Native** - Gerencie suas sessões de estudo com estatísticas e alertas visuais.

## 📋 Sobre o Projeto

App de temporizador para técnica Pomodoro com foco em simplicidade e produtividade. Desenvolvido como desafio de aprendizado de **React Hooks** (useState, useEffect, useRef).

### ✨ Funcionalidades

- ✅ **Timer regressivo configurável** (1-120 minutos)
- ✅ **Controles completos**: Iniciar, Pausar, Resetar
- ✅ **Alerta visual** quando restam menos de 60 segundos
- ✅ **Notificação nativa** ao completar sessão
- ✅ **Estatísticas persistentes**:
  - Contador de sessões completas
  - Tempo total estudado (horas/minutos)
- ✅ **UI responsiva** com tema dark mode
- ✅ **Input bloqueado** durante sessão ativa

---

## 🎯 Conceitos Implementados

### React Hooks Utilizados

| Hook | Propósito |
|------|-----------|
| `useState` | Gerenciar estados (tempo, pause, contadores) |
| `useEffect` | Controlar setInterval e detectar fim de sessão |
| `useRef` | Manter referência do interval sem re-render |

### Destaques Técnicos

- **Cleanup de interval** para prevenir memory leaks
- **Formatação de tempo** (MM:SS) com padStart
- **Estilos dinâmicos** baseados em estado
- **Validação de input** com limites (1-120 min)
- **Controle de side effects** com dependências corretas

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js (v14+)
- npm ou yarn
- React Native CLI
- Android Studio (Android) ou Xcode (iOS)
- Dispositivo físico ou emulador configurado

### Instalação

```bash
# 1. Clonar repositório
git clone https://github.com/seu-usuario/study-timer.git
cd study-timer

# 2. Instalar dependências
npm install
# ou
yarn install

# 3. Instalar pods (iOS apenas)
cd ios && pod install && cd ..
```

### Executar

#### Android
```bash
# Iniciar Metro Bundler
npx react-native start

# Em outro terminal, rodar no Android
npx react-native run-android
```

#### iOS (Mac apenas)
```bash
# Iniciar Metro Bundler
npx react-native start

# Em outro terminal, rodar no iOS
npx react-native run-ios
```

### Troubleshooting

**Erro: "Unable to load script"**
```bash
# Limpar cache e rebuild
npx react-native start --reset-cache
```

**Erro de build Android**
```bash
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

**Erro de pods (iOS)**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

---

## 📱 Como Usar

### 1️⃣ Configurar Sessão
- Digite os minutos desejados no campo (ex: 25 para Pomodoro clássico)
- Aceita valores entre 1 e 120 minutos
- Input desabilitado durante timer ativo

### 2️⃣ Controlar Timer
- **▶️ Iniciar**: Começa a contagem regressiva
- **⏸️ Pausar**: Pausa sem resetar o tempo
- **🔄 Resetar**: Volta ao tempo inicial configurado

### 3️⃣ Acompanhar Progresso
- **Display central**: Mostra tempo restante em MM:SS
- **Alerta visual**: Fundo fica vermelho nos últimos 60s
- **Notificação**: Pop-up ao completar sessão
- **Estatísticas**: Sessões completas e tempo total acumulado

---

## 🎨 Interface

### Paleta de Cores (Tailwind CSS)

```
Background Principal: #0f172a (slate-900)
Cards/Sections: #1e293b (slate-800)
Inputs: #334155 (slate-700)
Texto Primário: #f1f5f9 (slate-100)
Texto Secundário: #cbd5e1 (slate-300)
Destaque: #60a5fa (blue-400)
Alerta: #dc2626 (red-600)
Sucesso: #22c55e (green-500)
```

### Componentes Principais

- `SafeAreaView` + `ScrollView`: Layout seguro e scrollável
- `TextInput`: Input numérico com teclado apropriado
- `Pressable`: Botões com feedback visual
- `Alert`: Notificações nativas do sistema

---

## 🧪 Fluxo de Testes

### Teste Básico
1. ✅ Abrir app
2. ✅ Configurar timer para 1 minuto
3. ✅ Clicar em "Iniciar"
4. ✅ Verificar contagem regressiva
5. ✅ Clicar em "Pausar" aos 30s
6. ✅ Clicar em "Iniciar" novamente
7. ✅ Aguardar chegar a 0s
8. ✅ Verificar alerta de conclusão
9. ✅ Confirmar incremento nas estatísticas

### Teste de Alerta Visual
1. ✅ Configurar 2 minutos
2. ✅ Iniciar timer
3. ✅ Aos 59s, verificar mudança de cor (vermelho)
4. ✅ Conferir mensagem "⚠️ Último minuto!"

### Teste de Reset
1. ✅ Configurar 5 minutos
2. ✅ Iniciar e pausar aos 3 minutos
3. ✅ Clicar em "Resetar"
4. ✅ Verificar volta para 5:00

---

## 🔮 Melhorias Futuras

### Features Planejadas
- [ ] **Persistência de dados** com AsyncStorage
- [ ] **Vibração** ao finalizar (react-native-vibration)
- [ ] **Sons de notificação** (react-native-sound)
- [ ] **Histórico de sessões** com gráficos
- [ ] **Temas personalizáveis** (light/dark mode switch)
- [ ] **Modo foco** (bloqueio de apps durante sessão)
- [ ] **Intervalos automáticos** (pausa entre sessões)
- [ ] **Sincronização na nuvem** (Firebase)

### Otimizações Técnicas
- [ ] TypeScript para type safety
- [ ] Context API para estado global
- [ ] Testes unitários (Jest)
- [ ] CI/CD com GitHub Actions
- [ ] Animações com Reanimated
- [ ] Accessibility (WCAG 2.1)

---

## 📂 Estrutura do Projeto

```
StudyTimer/
├── android/              # Configurações Android
├── ios/                  # Configurações iOS
├── node_modules/         # Dependências
├── App.js               # ⭐ Código principal do timer
├── package.json          # Dependências e scripts
├── README.md             # Este arquivo
└── .gitignore
```

---

## 🧠 Aprendizados

### React Hooks
- **useEffect com cleanup**: Evitar memory leaks em intervals
- **useRef vs useState**: Quando usar cada um
- **Dependências de effect**: Array de dependências correto
- **Estado derivado**: Calcular valores sem estado extra

### React Native
- **Componentes nativos**: View, Text, TextInput, Pressable
- **StyleSheet**: Organização de estilos
- **Navegação condicional**: Renderização baseada em estado
- **Keyboard types**: keyboardType="numeric"
- **Alert API**: Notificações nativas

### Boas Práticas
- **Comentários descritivos** em código complexo
- **Nomes semânticos** de variáveis/funções
- **Separação de concerns** (lógica, UI, estilos)
- **Validação de input** do usuário
- **Feedback visual** em interações

---

## 🐛 Problemas Conhecidos

- ⚠️ **Persistência**: Estatísticas resetam ao fechar o app (AsyncStorage pendente)
- ⚠️ **Background**: Timer pausa quando app vai pra background (esperado no RN)
- ⚠️ **iOS**: Vibração requer permissões extras no Info.plist

---

## 📄 Licença

Este projeto é livre para uso educacional. Sinta-se à vontade para clonar, modificar e aprender! 🚀

---

## 👤 Autor

**Jhoyan** - Estudante Full Stack  
📍 Ji Paraná, RO | 💻 .NET Core + React Native

---

## 🙏 Agradecimentos

- Técnica Pomodoro de Francesco Cirillo
- Comunidade React Native
- Desafio de aprendizado sem IA (até a revisão final 😉)

---

## 📞 Suporte

Encontrou algum bug ou tem sugestões?
- Abra uma **Issue** no GitHub
- Envie um **Pull Request** com melhorias

**Happy Coding!** ⏱️✨
