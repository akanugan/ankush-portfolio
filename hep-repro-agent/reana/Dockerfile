FROM python:3.11-slim

WORKDIR /analysis
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc g++ \
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml README.md ./
COPY analysis/ analysis/
COPY agent/ agent/
COPY config/ config/
COPY reana/run.sh reana/

RUN pip install --no-cache-dir numpy matplotlib pyyaml uproot awkward scipy fsspec-xrootd

ENV PYTHONPATH=/analysis
ENTRYPOINT ["bash", "reana/run.sh"]
