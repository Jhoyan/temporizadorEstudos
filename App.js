import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView
} from 'react-native';

export default function App() {
  // Tempo inicial em minutos
  const [tempoInicialMinutos, setTempoInicialMinutos] = useState(25);

  // Segundos restantes no timer atual
  const [segundosRestantes, setSegundosRestantes] = useState(25 * 60); // 25min em segundos

  // Timer ativo?
  const [ativo, setAtivo] = useState(false);

  // Sessões completadas
  const [sessoesCompletas, setSessoesCompletas] = useState(0);

  // Tempo total estudado em segundos (soma de todas sessões)
  const [tempoTotalSegundos, setTempoTotalSegundos] = useState(0);

  // useRef pra guardar a referência do interval (não causa re-render quando muda)
  const intervalRef = useRef(null);

  useEffect(() => {
    // Se o timer estiver ativo E ainda tem tempo restante
    if (ativo && segundosRestantes > 0) {
      // Cria interval que decrementa 1 segundo a cada 1000ms
      intervalRef.current = setInterval(() => {
        setSegundosRestantes(prev => prev - 1);
      }, 1000);
    } else {
      // Se pausou ou acabou, limpa o interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    // Cleanup: quando o componente desmontar ou as dependências mudarem, limpa o interval pra não vazar memória
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [ativo, segundosRestantes]); // Re-executa quando ativo ou segundosRestantes mudam

  useEffect(() => {
    // Se chegou a zero E estava ativo (garante que não dispara no mount inicial)
    if (segundosRestantes === 0 && ativo) {
      // Para o timer
      setAtivo(false);

      // Incrementa contador de sessões completas
      setSessoesCompletas(prev => prev + 1);

      // Adiciona o tempo da sessão ao total (tempoInicialMinutos convertido pra segundos)
      setTempoTotalSegundos(prev => prev + (tempoInicialMinutos * 60));

      // Vibração (se disponível no ambiente)
      // Vibration.vibrate([0, 500, 200, 500]); // padrão: pausa, vibra, pausa, vibra

      // Alerta nativo
      Alert.alert(
        '🎉 Sessão Concluída!',
        `Você completou ${tempoInicialMinutos} minutos de estudo!`,
        [{ text: 'OK' }]
      );
    }
  }, [segundosRestantes, ativo, tempoInicialMinutos]); // Dependências necessárias



  // Iniciar/Retomar o timer
  const handleIniciar = () => {
    setAtivo(true);
  };

  // Pausar o timer
  const handlePausar = () => {
    setAtivo(false);
  };

  // Resetar: volta pro tempo inicial e pausa
  const handleResetar = () => {
    setAtivo(false);
    setSegundosRestantes(tempoInicialMinutos * 60);
  };

  // Atualizar o tempo inicial (chamado quando muda o TextInput)
  const handleMudarTempoInicial = (texto) => {
    // Converter texto pra número (se vazio, usa 0)
    const minutos = parseInt(texto) || 0;

    // Limitar entre 1 e 120 minutos
    const minLimitado = Math.max(1, Math.min(120, minutos));

    setTempoInicialMinutos(minLimitado);

    // Se o timer não está ativo, atualiza o tempo restante também
    if (!ativo) {
      setSegundosRestantes(minLimitado * 60);
    }
  };



  // Converter segundos em formato MM:SS
  const formatarTempo = (totalSegundos) => {
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;

    // padStart(2, '0') adiciona zero à esquerda se necessário (ex: 5 vira "05")
    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
  };

  // Converter tempo total estudado em horas e minutos
  const formatarTempoTotal = (totalSegundos) => {
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);

    if (horas > 0) {
      return `${horas}h ${minutos}min`;
    }
    return `${minutos}min`;
  };


  // Alerta vermelho quando falta menos de 60 segundos
  const alertaVermelho = segundosRestantes < 60 && segundosRestantes > 0;


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* CABEÇALHO */}
        <Text style={styles.titulo}>⏱️ Timer de Estudo</Text>

        {/* CONFIGURAÇÃO DE TEMPO */}
        <View style={styles.secaoConfig}>
          <Text style={styles.label}>Minutos por Sessão:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(tempoInicialMinutos)}
            onChangeText={handleMudarTempoInicial}
            maxLength={3}
            editable={!ativo} // Desabilita input quando timer está rodando
          />
        </View>

        {/* DISPLAY DO TIMER */}
        <View style={[
          styles.displayTimer,
          alertaVermelho && styles.displayAlerta
        ]}>
          <Text style={[
            styles.textoTimer,
            alertaVermelho && styles.textoAlerta
          ]}>
            {formatarTempo(segundosRestantes)}
          </Text>

          {alertaVermelho && (
            <Text style={styles.textoAviso}>⚠️ Último minuto!</Text>
          )}

          {segundosRestantes === 0 && (
            <Text style={styles.textoFim}>✅ Sessão Completa!</Text>
          )}
        </View>

        {/* BOTÕES DE CONTROLE */}
        <View style={styles.containerBotoes}>
          {!ativo ? (
            <Pressable
              style={({ pressed }) => [
                styles.botao,
                styles.botaoIniciar,
                pressed && styles.botaoPressionado
              ]}
              onPress={handleIniciar}
              disabled={segundosRestantes === 0}
            >
              <Text style={styles.textoBotao}>
                {segundosRestantes === 0 ? '▶️ Reiniciar' : '▶️ Iniciar'}
              </Text>
            </Pressable>
          ) : (
            <Pressable
              style={({ pressed }) => [
                styles.botao,
                styles.botaoPausar,
                pressed && styles.botaoPressionado
              ]}
              onPress={handlePausar}
            >
              <Text style={styles.textoBotao}>⏸️ Pausar</Text>
            </Pressable>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.botao,
              styles.botaoResetar,
              pressed && styles.botaoPressionado
            ]}
            onPress={handleResetar}
          >
            <Text style={styles.textoBotao}>🔄 Resetar</Text>
          </Pressable>
        </View>

        {/* ESTATÍSTICAS */}
        <View style={styles.secaoEstatisticas}>
          <Text style={styles.tituloSecao}>📊 Estatísticas</Text>

          <View style={styles.estatistica}>
            <Text style={styles.labelEstatistica}>Sessões Completas:</Text>
            <Text style={styles.valorEstatistica}>{sessoesCompletas}</Text>
          </View>

          <View style={styles.estatistica}>
            <Text style={styles.labelEstatistica}>Tempo Total Estudado:</Text>
            <Text style={styles.valorEstatistica}>
              {formatarTempoTotal(tempoTotalSegundos)}
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Dark blue
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginTop: 20,
    marginBottom: 30,
  },

  // Seção de configuração
  secaoConfig: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#cbd5e1',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#334155',
    color: '#f1f5f9',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    borderRadius: 8,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#475569',
  },

  // Display do timer
  displayTimer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 40,
    marginBottom: 30,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#475569',
  },
  displayAlerta: {
    backgroundColor: '#7f1d1d', // Vermelho escuro
    borderColor: '#dc2626',
  },
  textoTimer: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#60a5fa', // Azul claro
    fontVariant: ['tabular-nums'], // Números alinhados
  },
  textoAlerta: {
    color: '#fca5a5', // Vermelho claro
  },
  textoAviso: {
    fontSize: 18,
    color: '#fca5a5',
    marginTop: 10,
    fontWeight: '600',
  },
  textoFim: {
    fontSize: 20,
    color: '#86efac', // Verde claro
    marginTop: 10,
    fontWeight: '600',
  },

  // Botões
  containerBotoes: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  botao: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 140,
    alignItems: 'center',
  },
  botaoIniciar: {
    backgroundColor: '#22c55e', // Verde
  },
  botaoPausar: {
    backgroundColor: '#eab308', // Amarelo
  },
  botaoResetar: {
    backgroundColor: '#64748b', // Cinza
  },
  botaoPressionado: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  // Estatísticas
  secaoEstatisticas: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
  },
  tituloSecao: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 15,
  },
  estatistica: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  labelEstatistica: {
    fontSize: 16,
    color: '#cbd5e1',
  },
  valorEstatistica: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#60a5fa',
  },
});