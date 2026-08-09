class VoltageDropCalculator {
    constructor() {
        this.resistivity = {
            cobre: 1.72e-8,
            aluminio: 2.82e-8
        };
    }

    calculate(data) {
        const { system, material, section, length, current, pf } = data;
        
        const sectionM2 = section / 1e6;
        const resistivity = this.resistivity[material];
        
        const resistance = resistivity * (length / sectionM2);
        
        const factor = system === 'monofasico' ? 2 : Math.sqrt(3);
        
        const voltageDrop = factor * current * resistance;
        
        const voltageNominal = system === 'monofasico' ? 120 : 220;
      
        const percentage = (voltageDrop / voltageNominal) * 100;
        
        let status, statusClass;
        if (percentage <= 3) {
            status = 'Excelente';
            statusClass = 'status-success';
        } else if (percentage <= 5) {
            status = 'Aceptable';
            statusClass = 'status-warning';
        } else {
            status = 'Sobredimensionar';
            statusClass = 'status-danger';
        }
       
        const recommendations = this.generateRecommendations(
            system, material, section, length, current, percentage, voltageDrop
        );
        
        return {
            voltageDrop: voltageDrop,
            percentage: percentage,
            status: status,
            statusClass: statusClass,
            recommendations: recommendations,
            resistance: resistance,
            voltageNominal: voltageNominal,
            power: current * voltageNominal * pf
        };
    }

    generateRecommendations(system, material, section, length, current, percentage, voltageDrop) {
        const recs = [];
        
        if (percentage > 5) {
            const newSection = Math.ceil(section * (percentage / 5) * 2) / 2;
            recs.push(` Aumente la sección del conductor a ${newSection} mm²`);
            recs.push(` Considere reducir la longitud del circuito o aumentar el calibre`);
        }
        
        if (percentage > 3 && percentage <= 5) {
            recs.push(`El diseño es aceptable pero se recomienda monitorear la carga`);
            recs.push(`Verifique las conexiones para evitar calentamiento adicional`);
        }
        
        if (percentage <= 3) {
            recs.push(`El diseño cumple con los estándares NEC e IEC`);
            recs.push(`Instalación segura y eficiente energéticamente`);
        }
        
        if (material === 'aluminio' && length > 30) {
            recs.push(`Considere usar cobre para distancias superiores a 30m`);
        }
        
        if (system === 'monofasico' && current > 40) {
            recs.push(`Para cargas superiores a 40A, considere sistema trifásico`);
        }
        
        return recs;
    }
}

// Exportar para usar en otros módulos
window.VoltageDropCalculator = VoltageDropCalculator;