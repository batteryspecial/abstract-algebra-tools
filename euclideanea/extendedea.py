import math

def extendedEA(r1, r2, x1, x2, y1, y2, steps=None):
    if steps is None:
        steps = []
    
    try:
        q3 = math.floor(r1 / r2)
        r3 = r1 % r2
    except ZeroDivisionError:
        r3 = r1
        q3 = 0
    
    x3 = x1 - q3 * x2
    y3 = y1 - q3 * y2

    cur = {
        'r1': r1, 'r2': r2, 'r3': r3,
        'q3': q3, 'x1': x1, 'x2': x2,
        'x3': x3, 'y1': y1, 'y2': y2, 'y3': y3
    }
    steps.append(cur)

    if (r3 == 0):
        return (r2, x2, y2, steps) 
    
    return extendedEA(r2, r3, x2, x3, y2, y3, steps)