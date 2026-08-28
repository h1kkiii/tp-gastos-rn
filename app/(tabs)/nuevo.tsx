import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet } from 'react-native';

import { CampoTexto } from '@/components/campo-texto';
import { SelectorCategoria } from '@/components/selector-categoria';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { crearGasto } from '@/services/gastos-service';
import type { Categoria } from '@/types/gasto';
import { aDdMmAaaaDesdeIso, hoyIso } from '@/utils/fecha';
import {
  validarGasto,
  type EntradaFormulario,
  type ErroresFormulario,
} from '@/utils/validacion-gasto';

/** La fecha de hoy en dd/mm/aaaa, que es como se escribe en el campo. */
function fechaDeHoy(): string {
  return aDdMmAaaaDesdeIso(hoyIso()) ?? '';
}

export default function PantallaNuevoGasto() {
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  // La fecha viene precargada con hoy (FR-012).
  const [fecha, setFecha] = useState(fechaDeHoy);
  const [descripcion, setDescripcion] = useState('');

  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [errorAlGuardar, setErrorAlGuardar] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  const colorBoton = useThemeColor({}, 'tint');
  const colorFondo = useThemeColor({}, 'background');

  /**
   * Revalida al tocar un campo, pero solo si ya se intentó guardar. Así no se
   * marca en rojo un campo que la persona todavía está completando, y a la vez
   * el mensaje desaparece en cuanto lo corrige, como pide el data-model.
   *
   * Recibe el campo cambiado porque el estado todavía tiene el valor anterior:
   * `setMonto` no actualiza `monto` hasta el próximo render.
   */
  function revalidar(cambio: Partial<EntradaFormulario>) {
    if (Object.keys(errores).length === 0) return;
    setErrores(validarGasto({ monto, categoria, fecha, descripcion, ...cambio }).errores);
  }

  async function guardar() {
    const { errores: hallados, datos } = validarGasto({ monto, categoria, fecha, descripcion });
    setErrores(hallados);
    setErrorAlGuardar(null);
    if (!datos) return;

    setGuardando(true);
    try {
      await crearGasto(datos);
      // Se limpia recién cuando el guardado salió bien: si falla, no se pierde
      // nada de lo cargado.
      setMonto('');
      setCategoria(null);
      setFecha(fechaDeHoy());
      setDescripcion('');
      setErrores({});
      router.push('/');
    } catch (e) {
      setErrorAlGuardar(e instanceof Error ? e.message : 'No se pudo guardar el gasto.');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <ThemedView style={estilos.contenedor}>
      <KeyboardAvoidingView
        style={estilos.contenedor}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={estilos.scroll} keyboardShouldPersistTaps="handled">
          <ThemedText type="title">Nuevo gasto</ThemedText>

          {errorAlGuardar ? (
            <ThemedText accessibilityRole="alert" style={estilos.errorGeneral}>
              {errorAlGuardar}
            </ThemedText>
          ) : null}

          <CampoTexto
            etiqueta="Monto"
            valor={monto}
            onChangeText={(valor) => {
              setMonto(valor);
              revalidar({ monto: valor });
            }}
            placeholder="0,00"
            keyboardType="decimal-pad"
            error={errores.monto}
          />

          <SelectorCategoria
            valor={categoria}
            onChange={(valor) => {
              setCategoria(valor);
              revalidar({ categoria: valor });
            }}
            error={errores.categoria}
          />

          <CampoTexto
            etiqueta="Fecha"
            valor={fecha}
            onChangeText={(valor) => {
              setFecha(valor);
              revalidar({ fecha: valor });
            }}
            placeholder="dd/mm/aaaa"
            error={errores.fecha}
          />

          <CampoTexto
            etiqueta="Descripción (opcional)"
            valor={descripcion}
            onChangeText={setDescripcion}
            placeholder="En qué gastaste"
            multiline
          />

          {/* Deshabilitado mientras guarda: con 500–1000 ms de latencia hay
              tiempo de sobra para tocar dos veces y crear el gasto duplicado. */}
          <Pressable
            onPress={guardar}
            disabled={guardando}
            accessibilityRole="button"
            accessibilityState={{ disabled: guardando }}
            style={({ pressed }) => [
              estilos.boton,
              { backgroundColor: colorBoton, opacity: guardando ? 0.5 : pressed ? 0.7 : 1 },
            ]}>
            <ThemedText type="defaultSemiBold" style={{ color: colorFondo }}>
              {guardando ? 'Guardando…' : 'Guardar'}
            </ThemedText>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  scroll: {
    padding: 16,
    paddingTop: 72,
    paddingBottom: 48,
    gap: 16,
  },
  errorGeneral: {
    color: '#d13438',
  },
  boton: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
});
