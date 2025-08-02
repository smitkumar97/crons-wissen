import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cron-expression-evaluator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cron-expression-evaluator.component.html',
  styleUrls: ['./cron-expression-evaluator.component.css'],
})
export class CronExpressionEvaluatorComponent {
  cronExpression: string = '';
  cronFields = { seconds: '*', minutes: '*', hours: '*', days: '*', month: '*', dayOfWeek: '*' };
  activeFields = { seconds: false, minutes: false, hours: false, days: false, month: false, dayOfWeek: false };

  private monthMap: { [key: string]: string } = {
    'JAN': '1', 'FEB': '2', 'MAR': '3', 'APR': '4', 'MAY': '5', 'JUN': '6',
    'JUL': '7', 'AUG': '8', 'SEP': '9', 'OCT': '10', 'NOV': '11', 'DEC': '12'
  };

  private dayMap: { [key: string]: string } = {
    'SUN': '0', 'MON': '1', 'TUE': '2', 'WED': '3', 'THU': '4', 'FRI': '5', 'SAT': '6'
  };

  onCronChange(value: string) {
    this.resetFields();

    if (!value) return;

    const parts = value.trim().split(/\s+/).filter(part => part.length > 0);

    if (parts.length !== 6) return;

    this.parseField('seconds', parts[0]);
    this.parseField('minutes', parts[1]);
    this.parseField('hours', parts[2]);
    this.parseField('days', parts[3]);
    this.parseMonthField(parts[4]);
    this.parseDayOfWeekField(parts[5]);
  }

  private resetFields() {
    this.cronFields = { seconds: '*', minutes: '*', hours: '*', days: '*', month: '*', dayOfWeek: '*' };
    this.activeFields = { seconds: false, minutes: false, hours: false, days: false, month: false, dayOfWeek: false };
  }

  private parseField(field: 'seconds' | 'minutes' | 'hours' | 'days', value: string) {
    if (value !== '*') {
      this.cronFields[field] = value;
      this.activeFields[field] = true;
    }
  }

  private parseMonthField(value: string) {
    if (value === '*') return;

    const monthKey = value.toUpperCase();
    if (this.monthMap[monthKey]) {
      this.cronFields.month = monthKey;
      this.activeFields.month = true;
    } else if (!isNaN(Number(value))) {
      this.cronFields.month = value;
      this.activeFields.month = true;
    }
  }

  private parseDayOfWeekField(value: string) {
    if (value === '*') return;

    const dayKey = value.toUpperCase();
    if (this.dayMap[dayKey]) {
      this.cronFields.dayOfWeek = dayKey;
      this.activeFields.dayOfWeek = true;
    } else if (!isNaN(Number(value))) {
      this.cronFields.dayOfWeek = value;
      this.activeFields.dayOfWeek = true;
    }
  }
}
