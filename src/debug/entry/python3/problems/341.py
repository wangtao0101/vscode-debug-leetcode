def runUserScript(func, params, paramTypes):
    if (len(params) != len(paramTypes)):
        onParameterError()

    newParams = []
    for i, val in enumerate(params):
        newParams.append(parseParameter(i, paramTypes[i], val))

    i, v = func(newParams[0]), []
    while i.hasNext():
        v.append(i.next())


def parseSpecialParameter(index, type, param):
    return None
