import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recurrence-pattern-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleCasePipe],
  providers: [],
  templateUrl: './recurrence-pattern-generator.component.html',
  styleUrls: ['./recurrence-pattern-generator.component.css'],
})
export class RecurrencePatternGeneratorComponent {
  // Add this line to expose Object to the template
  Object = Object;

  weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  pattern: string = 'daily';
  time: string = '12:00';
  date: string = '1';
  selectedDays: { [key: string]: boolean } = {
    monday: false, tuesday: false, wednesday: false,
    thursday: false, friday: false, saturday: false, sunday: false
  };
  description: string = '';

  ngOnInit() {
    this.generateDescription();
  }

  onPatternChange(value: string) {
    this.pattern = value;
    this.generateDescription();
  }

  onTimeChange(value: string) {
    this.time = value;
    this.generateDescription();
  }

  toggleDay(day: string) {
    this.selectedDays[day] = !this.selectedDays[day];
    this.generateDescription();
  }

  onDateChange(value: string) {
    this.date = value;
    this.generateDescription();
  }

  generateDescription() {
    const formattedTime = this.formatTime(this.time);

    switch (this.pattern) {
      case 'daily':
        this.description = `Runs every day at ${formattedTime}.`;
        break;
      case 'weekly':
        const selectedDays = this.getSelectedDays();
        if (selectedDays.length > 0) {
          const daysString = this.joinWithAnd(selectedDays.map(day => this.capitalize(day)));
          this.description = `Runs every week on ${daysString} at ${formattedTime}.`;
        } else {
          this.description = `Runs every week at ${formattedTime}.`;
        }
        break;
      case 'monthly':
        const suffix = this.ordinalSuffix(this.date);
        this.description = `Runs every month on the ${this.date}${suffix} day at ${formattedTime}.`;
        break;
      default:
        this.description = '';
    }
  }

  capitalize(day: string): string {
    return day.charAt(0).toUpperCase() + day.slice(1);
  }

  ordinalSuffix(day: string): string {
    const dayNum = parseInt(day, 10);
    if (isNaN(dayNum)) return '';

    if (dayNum >= 11 && dayNum <= 13) {
      return 'th';
    }

    switch (dayNum % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  getSelectedDays(): string[] {
    return Object.keys(this.selectedDays).filter(day => this.selectedDays[day]);
  }

  formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  }

  joinWithAnd(items: string[]): string {
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
  }

}
