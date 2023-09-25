/**
 * @param format
 * @param picker
 * @param showTime
 */
export function getDefaultFormat(valueFormat, picker, showTime) {
  var mergedFormat = valueFormat;
  if (!mergedFormat) {
    switch (picker) {
      case 'time':
        mergedFormat = 'HH:mm:ss';
        break;
      case 'week':
        mergedFormat = 'YYYY-W[W]';
        break;
      case 'month':
        mergedFormat = 'YYYY-MM';
        break;
      case 'quarter':
        mergedFormat = 'YYYY-[Q]Q';
        break;
      case 'year':
        mergedFormat = 'YYYY';
        break;
      default:
        mergedFormat = showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
    }
  }
  return mergedFormat;
}